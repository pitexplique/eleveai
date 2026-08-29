// ─── Fiche de cours : agrandissement, réduction et échelles (4e) ───────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/echelles.bank.ts, notionId prop_echelle).
//
// ⭐ NOTION OUVERTE LE 28/08/2026. Elle ferme DEUX trous du BO et complète DEUX
// partiels — le meilleur rapport de tout ce qui restait au programme :
//   · 4e-C-transformations-2 « Utiliser un rapport de réduction ou
//     d'agrandissement (architecture, maquettes) pour calculer des longueurs,
//     des aires, des volumes » ;
//   · 4e-C-transformations-3 « Utiliser l'échelle d'une carte » ;
//   · 4e-C-transformations-1, dont l'effet sur les AIRES et les VOLUMES
//     manquait ; 4e-B-proportionnalite-8, qui n'avait que les pourcentages.
//
// ⭐ UN SEUL OBJET, ET LE BO LE DIT : une échelle EST une réduction de rapport
// 1/k. Le programme cite « pourcentages, échelles, agrandissement réduction »
// dans la même compétence. La fiche suit cette unité : elle commence par la
// lecture d'une échelle, et finit par le volume d'une maquette — c'est la même
// idée qui monte d'une dimension à chaque fois.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres de
// la fiche sortent de la banque :
//   echelle_comprendre       → 1/25 000 → 1 cm pour 250 m ; 1/500 est une réduction
//   echelle_distance_reelle  → 4 cm au 1/25 000 → 1 km
//   echelle_distance_plan    → 12 m au 1/200 → 6 cm
//   agrandissement_rapport   → rapport 3 ; réduction 1/4
//   agrandissement_aire      → ×2 sur les longueurs → ×4 sur l'aire
//   agrandissement_volume    → ×2 → ×8 ; la maquette au 1/10 contient un millième
//   echelle_defi             → la carte de La Réunion, les pots de peinture
//
// ⭐ TROIS MICROS RÉACTIVENT LA 6e, avec ses identifiants exacts. Frédéric,
// 28/08 : « on garde le rappel de 6e ». Renvoyer un élève de 4e vers une fiche
// de 6e serait un jugement ; le moteur d'étoiles fait le tri sans rien dire.
// Les ÉNONCÉS, eux, sont de 4e — cartes IGN, maquettes, plans d'architecte.
//
// ⭐⭐ LE DESSIN QUI PORTE LA FICHE EST UN QUADRILLAGE, ET IL SE COMPTE.
// L'élève est certain que doubler les longueurs double l'aire ; aucune phrase ne
// l'en fait démordre. Un carré de côté 4 découpé en quatre carrés de côté 2, si.
// C'est la seule fois de la fiche où le dessin ne soutient pas le texte : il le
// remplace.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

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

// ⛔⛔ LE CANVAS `echelle` A ÉTÉ ÉCARTÉ DE CETTE FICHE LE 28/08/2026, APRÈS
// MESURE — et c'est un membre NEUF de la famille des canvas à POINTS FIXES, que
// la passation ne listait pas encore (elle connaissait `triangle`,
// `quadrilatere`, `thales`, `transformation`, `solide_3d`, `fonctionGraphique`).
//
// `EchelleCanvas.tsx` trace ses segments de x=115 à x=345 et pose ses étiquettes
// à y=164, dans un viewBox par défaut de 420 × 240. Les deux issues sont
// mauvaises dans une carte de fiche large de 222 px :
//   · réduire la `size` à 228 → tout ce qui dépasse x=228 SORT du cadre.
//     Mesuré : TREIZE débordements — « en vrai », « 12 m », « ? »… ;
//   · garder 420 → la police de 15 px tombe à 15 × 222 ÷ 420 ≈ 8 px, sous le
//     plancher de 11.
//
// ⭐ IL RESTE PARFAIT DANS LE COACH, où la zone de question fait le double de
// large — et `echelles.bank.ts` l'y emploie, lui, dans ses trois variantes.
// 👉 LA LEÇON : un canvas peut être bon d'un côté et impossible de l'autre.
// C'est la LARGEUR DU BLOC qui décide, pas le canvas.
//
// Ici, la même information passe par un tableau : il se rend en cellules HTML,
// suit la largeur de son bloc, et ne rogne jamais.
const echelleTableau = (
  lignes: { values: (string | number)[] }[],
  legende: string,
  bloc: "carte" | "exemple" = "carte"
) =>
  tableau(
    {
      headers: ["sur le plan", "en vrai"],
      rows: lignes,
      caption: legende,
    },
    bloc
  );

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px : 222 px pour une
// carte de propriété, 216 px pour « La formule », 200 px pour un exemple. La
// police finale vaut police × largeurAffichée ÷ largeurViewBox, plancher 11 px.
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

// ⭐⭐ LE DESSIN LE PLUS IMPORTANT DE LA FICHE. Un carré de côté 4, quadrillé en
// carreaux de côté 1 : le carré de côté 2 y tient QUATRE fois. On ne démontre
// pas le k², on le fait compter. ⚠️ `cellSize`, jamais `width` : ce canvas
// dessine sur des points fixes, et réduire son cadre le ROGNE au lieu de le
// mettre à l'échelle.
const CARRE_4 = Array.from({ length: 4 }, (_, r) =>
  Array.from({ length: 4 }, (_, c) => [r, c] as [number, number])
).flat();

const quatreFois = (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: { rows: 4, cols: 4, filledCells: CARRE_4 },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
      colors: { filled: "#dbeafe", grid: "#94a3b8", perimeter: BLEU },
      size: { cellSize: 34, padding: 16 },
    }}
  />
);

// LA RÈGLE DES TROIS DIMENSIONS, POSÉE D'UN COUP. C'est le tableau qu'on relit
// avant un contrôle : une dimension de plus, un facteur k de plus.
const troisDimensions = tableau(
  {
    headers: ["ce qu'on mesure", "rapport 2", "rapport 3"],
    rows: [
      { values: ["une longueur", "× 2", "× 3"] },
      { values: ["une aire", "× 4", "× 9"] },
      { values: ["un volume", "× 8", "× 27"] },
    ],
    highlight: { row: 1 },
    caption: "k, puis k², puis k³",
  },
  "formule"
);

export const ficheEchelles4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "prop-echelle",
  titre: "Agrandissement, réduction et échelles",
  accroche:
    "Une carte, une maquette, un plan d'architecte : trois façons de représenter en petit ce qui est grand. La règle est simple pour les longueurs — on multiplie par le même nombre. Elle l'est beaucoup moins pour les aires et les volumes, et c'est là que se joue tout le chapitre.",
  identite: [
    { label: "Le mot de 4e", valeur: "Rapport k : toutes les longueurs sont multipliées par k" },
    { label: "La règle qui surprend", valeur: "Les aires par $k^2$, les volumes par $k^3$" },
    { label: "Le piège", valeur: "Doubler les longueurs ne double pas l'aire : elle QUADRUPLE" },
  ],
  definition: {
    texte:
      "Un agrandissement de rapport $k$ multiplie toutes les longueurs d'une figure par $k$, sans changer aucun angle : la forme est conservée. Si $k > 1$ c'est un agrandissement, si $k < 1$ c'est une réduction. Une échelle est exactement cela : l'échelle $\\frac{1}{25\\,000}$ d'une carte est une réduction de rapport $\\frac{1}{25\\,000}$, où 1 cm sur le papier représente 25 000 cm — soit 250 m — dans la réalité.",
  },
  figure: {
    schema: echelleTableau(
      [
        { values: ["1 cm", "250 m"] },
        { values: ["4 cm", "1 km"] },
        { values: ["10 cm", "2,5 km"] },
      ],
      "une carte IGN au 1/25 000"
    ),
    legende:
      "L'échelle relie DEUX mesures de la même longueur : celle du papier et celle du terrain. Le dénominateur dit de combien on a réduit.",
  },
  proprietes: [
    {
      titre: "Le dénominateur dit de combien on réduit",
      micros: ["echelle_comprendre"],
      texte:
        "Dans l'échelle $\\frac{1}{d}$, le 1 est le plan et le $d$ est la réalité, dans la MÊME unité. Au $\\frac{1}{500}$, 1 cm vaut 500 cm, soit 5 m. ⚠️ Contre-intuitif : plus le dénominateur est GRAND, moins la carte montre de détails — le $\\frac{1}{100}$ montre un appartement, le $\\frac{1}{100\\,000}$ un département.",
      schema: tableau({
        headers: ["échelle", "1 cm vaut", "on y voit"],
        rows: [
          { values: ["1/100", "1 m", "un appartement"] },
          { values: ["1/25 000", "250 m", "un sentier"] },
          { values: ["1/100 000", "1 km", "un département"] },
        ],
        highlight: { col: 1 },
        caption: "même centimètre, trois mondes",
      }),
    },
    {
      titre: "Du plan vers la réalité : on multiplie",
      micros: ["echelle_distance_reelle"],
      texte:
        "La réalité est plus grande que le plan, donc on multiplie par le dénominateur. Au $\\frac{1}{25\\,000}$, 4 cm sur la carte donnent $4 \\times 25\\,000 = 100\\,000$ cm, c'est-à-dire 1 km. ⚠️ L'erreur n'est presque jamais la multiplication : c'est la conversion qui suit.",
      schema: legende(
        echelleTableau(
          [
            { values: ["4 cm", "× 25 000"] },
            { values: ["", "100 000 cm"] },
            { values: ["", "1 km"] },
          ],
          "au 1/25 000 : on multiplie, puis on convertit"
        ),
        "4 cm sur la carte, c'est 1 km sur le terrain"
      ),
    },
    {
      titre: "De la réalité vers le plan : on divise",
      micros: ["echelle_distance_plan"],
      texte:
        "Le plan est plus petit, donc on divise. Une façade de 12 m dessinée au $\\frac{1}{200}$ : on convertit d'abord — 12 m = 1 200 cm — puis on divise, $1\\,200 \\div 200 = 6$ cm. ⚠️ Convertir AVANT de diviser : des mètres divisés par un dénominateur en centimètres ne veulent rien dire.",
      schema: legende(
        echelleTableau(
          [
            { values: ["?", "12 m"] },
            { values: ["", "1 200 cm"] },
            { values: ["6 cm", "÷ 200"] },
          ],
          "au 1/200 : on convertit, puis on divise"
        ),
        "12 m en vrai, 6 cm sur le plan"
      ),
    },
    {
      titre: "Un rapport agrandit toutes les longueurs",
      micros: ["agrandissement_rapport"],
      texte:
        "Un agrandissement de rapport 3 multiplie la longueur par 3, la largeur par 3, la hauteur par 3, et chaque diagonale par 3. Les ANGLES, eux, ne bougent pas — c'est ce qui fait que la figure garde sa forme. Une réduction est la même chose avec un rapport plus petit que 1 : réduire au $\\frac{1}{4}$, c'est diviser par 4.",
      schema: tableau({
        headers: ["", "modèle", "rapport 3"],
        rows: [
          { values: ["longueur", "5 cm", "15 cm"] },
          { values: ["largeur", "4 cm", "12 cm"] },
          { values: ["angles", "90°", "90°"] },
        ],
        highlight: { row: 2 },
        caption: "les longueurs changent, les angles non",
      }),
    },
    {
      titre: "Les aires sont multipliées par $k^2$",
      micros: ["agrandissement_aire"],
      texte:
        "C'est le point qui coûte le plus cher de l'année, et il ne se retient pas : il se compte. Doublez le côté d'un carré, et le grand carré contient QUATRE petits — pas deux. La raison tient en une ligne : une aire est un produit de deux longueurs, et chacune a été multipliée par $k$, donc l'aire l'est par $k \\times k$.",
      schema: legende(quatreFois, "le carré de côté 2 tient QUATRE fois dans celui de côté 4"),
    },
    {
      titre: "Les volumes sont multipliés par $k^3$",
      micros: ["agrandissement_volume"],
      texte:
        "La même idée, une dimension plus haut : un volume est un produit de TROIS longueurs, donc il est multiplié par $k \\times k \\times k$. C'est pourquoi une maquette au $\\frac{1}{10}$ ne contient pas un dixième du vrai réservoir, mais un MILLIÈME — et pourquoi une fourmi géante de cinéma s'effondrerait sous son propre poids.",
      schema: troisDimensions,
    },
  ],
  reel: {
    texte:
      "L'échelle est le langage de tous ceux qui dessinent avant de construire. À La Réunion, la carte IGN au 1/25 000 est celle des randonneurs : 4 cm entre deux gîtes, et l'on sait qu'il y a 1 km à marcher. L'architecte travaille au 1/50 ou au 1/100, le cadastre au 1/2 000. Et la règle du $k^2$ se paie en vrai : un panneau deux fois plus long et deux fois plus haut ne demande pas deux pots de peinture de plus, mais quatre fois plus de peinture. Celle du $k^3$ explique pourquoi les grands animaux ont des pattes épaisses — le poids suit le volume, la résistance des os suit leur section.",
  },
  historique: {
    texte:
      "Les plans à l'échelle sont bien plus vieux que les mathématiques qui les justifient : on a retrouvé à Ninive, gravé vers 2100 avant notre ère, le plan d'une ville sumérienne avec ses distances. Mais c'est la Renaissance qui en fait une technique — les carnets de Villard de Honnecourt, au XIIIe siècle, puis les traités d'architecture italiens. Quant à l'effet sur les aires et les volumes, il a une conséquence célèbre : Galilée, dans les « Discours » de 1638, explique qu'un animal ne peut pas être agrandi indéfiniment, parce que son poids croît comme le cube quand la résistance de ses os croît comme le carré. C'est la première fois qu'un raisonnement de proportion explique une forme vivante.",
  },
  formule: {
    contexte: "Pour un agrandissement ou une réduction de rapport k",
    expression: "longueurs × k   ·   aires × k²   ·   volumes × k³",
    legende:
      "Une dimension de plus, un facteur k de plus. C'est la seule chose à retenir du chapitre — le reste s'en déduit, y compris les échelles, où k vaut 1/d.",
    schema: troisDimensions,
  },
  methode: [
    {
      titre: "Lire une échelle",
      micros: ["echelle_comprendre"],
      // ⛔ Le seul bloc sans dessin : la figure de référence et la première
      // propriété montrent déjà l'objet. Un schéma de plus redirait le texte.
      texte:
        "On lit le dénominateur : c'est le nombre par lequel la réalité a été divisée. Pour savoir ce que vaut 1 cm, on le multiplie par ce dénominateur, puis on convertit — 25 000 cm font 250 m.",
    },
    {
      titre: "Passer d'une distance à l'autre",
      micros: ["echelle_distance_reelle", "echelle_distance_plan"],
      texte:
        "Une seule question à se poser : est-ce que je vais vers le PLUS GRAND ou vers le PLUS PETIT ? Vers la réalité, on multiplie ; vers le plan, on divise. Et on convertit toujours dans la même unité avant de calculer.",
      schema: tableau({
        headers: ["je pars de", "je vais vers", "je fais"],
        rows: [
          { values: ["le plan", "la réalité", "× d"] },
          { values: ["la réalité", "le plan", "÷ d"] },
        ],
        caption: "la seule question : plus grand, ou plus petit ?",
      }),
    },
    {
      titre: "Calculer avec un rapport",
      micros: ["agrandissement_rapport", "agrandissement_aire", "agrandissement_volume"],
      texte:
        "On identifie d'abord CE QU'ON MESURE. Une longueur, un périmètre, une diagonale ? On multiplie par $k$. Une aire, une surface à peindre ? Par $k^2$. Un volume, une contenance, une masse ? Par $k^3$. C'est la nature de la grandeur qui décide, pas l'énoncé.",
      schema: tableau({
        headers: ["la grandeur", "le facteur"],
        rows: [
          { values: ["longueur, périmètre", "k"] },
          { values: ["aire, surface", "k²"] },
          { values: ["volume, contenance", "k³"] },
        ],
        highlight: { col: 1 },
        caption: "c'est la grandeur qui décide",
      }),
    },
    {
      titre: "Retrouver le rapport",
      micros: ["agrandissement_rapport", "agrandissement_aire"],
      texte:
        "On divise une longueur de l'image par la longueur correspondante du modèle. ⚠️ On DIVISE, on ne soustrait pas : l'écart entre deux figures semblables n'est pas constant, le rapport si. Et si l'on ne connaît que les aires, on remonte par la racine carrée — une aire multipliée par 9 vient d'un rapport 3.",
    },
  ],
  usages: [
    {
      titre: "On a une carte et on veut une distance",
      micros: ["echelle_distance_reelle"],
      detail:
        "On mesure en centimètres, on multiplie par le dénominateur, on convertit. C'est le geste du randonneur.",
    },
    {
      titre: "On doit faire tenir un plan sur une feuille",
      micros: ["echelle_distance_plan"],
      detail:
        "On divise la mesure réelle par la place disponible : le résultat est le dénominateur de l'échelle à choisir.",
    },
    {
      titre: "On agrandit et on veut une surface",
      micros: ["agrandissement_aire"],
      detail:
        "Peinture, tissu, carrelage, papier peint : ce sont des aires. Le facteur est $k^2$, jamais $k$.",
    },
    {
      titre: "On agrandit et on veut une contenance",
      micros: ["agrandissement_volume", "echelle_defi"],
      detail:
        "Réservoir, bassin, emballage : ce sont des volumes. Le facteur est $k^3$ — une maquette au $\\frac{1}{10}$ contient un millième.",
    },
  ],
  exemples: [
    {
      titre: "Deux villages sur la carte",
      micros: ["echelle_distance_reelle", "echelle_defi"],
      donnees: "Sur une carte de La Réunion au $\\frac{1}{25\\,000}$, deux villages sont distants de 4 cm.",
      question: "Quelle distance les sépare réellement ?",
      schema: echelleTableau(
        [
          { values: ["4 cm", "?"] },
          { values: ["× 25 000", "100 000 cm"] },
          { values: ["on convertit", "1 km"] },
        ],
        "au 1/25 000, pas à pas",
        "exemple"
      ),
      solution:
        "On va du plan vers la réalité, donc on multiplie : $4 \\times 25\\,000 = 100\\,000$ cm.\n\nIl reste à convertir. 1 km vaut 100 000 cm, donc la distance est de 1 km.\n\n⚠️ Le calcul est facile, la conversion l'est moins : répondre 100 000 m au lieu de 100 000 cm donnerait 100 km — une erreur d'un facteur cent, et un randonneur perdu.",
    },
    {
      titre: "Le panneau à repeindre",
      micros: ["agrandissement_aire"],
      donnees: "Il faut 3 pots de peinture pour un panneau. On en fait un second, deux fois plus long ET deux fois plus haut.",
      question: "Combien de pots faut-il ?",
      schema: legende(quatreFois, "deux fois plus long et haut : QUATRE fois la surface"),
      solution:
        "La peinture se compte à l'AIRE, pas à la longueur. Les deux dimensions sont multipliées par 2, donc l'aire est multipliée par $2 \\times 2 = 4$.\n\nCalcul : $3 \\times 4 = 12$ pots.\n\n⚠️ Répondre 6 pots — $3 \\times 2$ — c'est traiter une aire comme une longueur. Le dessin le dit sans calcul : le grand carré contient quatre petits.",
    },
    {
      titre: "La maquette du réservoir",
      micros: ["agrandissement_volume"],
      donnees: "Une maquette de réservoir au $\\frac{1}{10}$ contient 2 L.",
      question: "Combien contient le vrai réservoir ?",
      schema: tableau(
        {
          headers: ["grandeur", "rapport 10"],
          rows: [
            { values: ["hauteur", "× 10"] },
            { values: ["surface", "× 100"] },
            { values: ["contenance", "× 1 000"] },
          ],
          highlight: { row: 2 },
          caption: "au 1/10, la contenance est au millième",
        },
        "exemple"
      ),
      solution:
        "« Au $\\frac{1}{10}$ » porte sur les LONGUEURS : le vrai réservoir est 10 fois plus haut, 10 fois plus long, 10 fois plus large.\n\nUne contenance est un volume, donc elle est multipliée par $10^3 = 1\\,000$. Calcul : $2 \\times 1\\,000 = 2\\,000$ L.\n\n⚠️ Répondre 20 L revient à traiter le volume comme une longueur. C'est la même erreur que pour la peinture, une dimension plus haut.",
    },
  ],
  pieges: [
    "Croire qu'un grand dénominateur donne une carte détaillée. C'est l'inverse : le $\\frac{1}{100}$ montre un appartement, le $\\frac{1}{100\\,000}$ un département.",
    "Diviser des mètres par un dénominateur exprimé en centimètres. On convertit AVANT de calculer, jamais après.",
    "Doubler les longueurs et doubler l'aire. L'aire est multipliée par $2^2 = 4$ — c'est l'erreur la plus fréquente du chapitre.",
    "Multiplier un volume par $k$ au lieu de $k^3$. Une maquette au $\\frac{1}{10}$ contient un millième, pas un dixième.",
    "Retrouver le rapport en soustrayant. On DIVISE une longueur de l'image par celle du modèle : l'écart ne se conserve pas, le rapport si.",
    "Oublier que les angles ne changent pas. Un agrandissement conserve la forme — c'est même sa définition.",
  ],
  aRetenir: [
    "Un agrandissement de rapport $k$ multiplie toutes les longueurs par $k$ et ne change aucun angle.",
    "Si $k > 1$ c'est un agrandissement, si $k < 1$ c'est une réduction. Une échelle $\\frac{1}{d}$ est une réduction de rapport $\\frac{1}{d}$.",
    "Les AIRES sont multipliées par $k^2$. Doubler les longueurs quadruple l'aire.",
    "Les VOLUMES sont multipliés par $k^3$. Doubler les longueurs multiplie le volume par 8.",
    "Du plan vers la réalité : on MULTIPLIE par $d$. De la réalité vers le plan : on DIVISE par $d$.",
    "On convertit toujours dans la même unité avant de calculer — c'est là que se logent les erreurs d'un facteur 100.",
  ],
  entrainement: [
    {
      micros: ["echelle_comprendre"],
      question: "Sur une carte au $\\frac{1}{50\\,000}$, que représente 1 cm ?",
      correction:
        "1 cm représente 50 000 cm. Or 50 000 cm = 500 m. Donc 1 cm vaut 500 m, soit un demi-kilomètre.",
    },
    {
      micros: ["echelle_distance_reelle"],
      question: "Sur un plan de quartier au $\\frac{1}{1\\,000}$, une rue mesure 8 cm. Quelle est sa longueur réelle ?",
      correction:
        "$8 \\times 1\\,000 = 8\\,000$ cm, soit 80 m.",
    },
    {
      micros: ["echelle_distance_plan"],
      question: "Une façade de 15 m est dessinée au $\\frac{1}{500}$. Quelle est sa longueur sur le plan ?",
      correction:
        "On convertit d'abord : 15 m = 1 500 cm. Puis on divise : $1\\,500 \\div 500 = 3$ cm.",
    },
    {
      micros: ["agrandissement_rapport"],
      question: "Deux maquettes du même bâtiment : la petite mesure 6 cm de haut, la grande 24 cm. Quel est le rapport d'agrandissement ?",
      correction:
        "On divise : $24 \\div 6 = 4$. Le rapport vaut 4. ⚠️ $24 - 6 = 18$ serait l'écart, et l'écart ne se conserve pas d'une dimension à l'autre.",
    },
    {
      micros: ["agrandissement_aire"],
      question: "Une figure de 20 cm² est agrandie avec un rapport 3. Quelle est sa nouvelle aire ?",
      correction:
        "L'aire est multipliée par $3^2 = 9$. Donc $20 \\times 9 = 180$ cm². ⚠️ $20 \\times 3 = 60$ serait vrai pour une longueur, pas pour une aire.",
    },
    {
      micros: ["agrandissement_aire"],
      question: "L'aire d'une figure a été multipliée par 25. Par combien ses longueurs l'ont-elles été ?",
      correction:
        "On remonte par la racine carrée : $5 \\times 5 = 25$, donc les longueurs ont été multipliées par 5.",
    },
    {
      micros: ["agrandissement_volume"],
      question: "Un solide de 12 cm³ est agrandi avec un rapport 2. Quel est son nouveau volume ?",
      correction:
        "Le volume est multiplié par $2^3 = 8$. Donc $12 \\times 8 = 96$ cm³.",
    },
    {
      micros: ["echelle_defi"],
      question:
        "Deux villes de La Réunion sont distantes de 20 km. Sur une carte, elles sont à 5 cm l'une de l'autre. Quelle est l'échelle de la carte ?",
      correction:
        "On convertit : 20 km = 2 000 000 cm. Puis on divise par la mesure du plan : $2\\,000\\,000 \\div 5 = 400\\,000$. L'échelle est donc le $\\frac{1}{400\\,000}$.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesEchelles4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Agrandissement, réduction et échelles - 4e",
    section: {
      type: "objectif",
      phrase: "Représenter en petit ce qui est grand",
      sousPhrase:
        "Une carte, une maquette, un plan d'architecte : la même figure, à une autre taille. La règle est simple pour les longueurs, beaucoup moins pour les aires et les volumes.",
      encadre: {
        titre: "L'idée",
        texte:
          "Un rapport k multiplie TOUTES les longueurs par k, et ne change aucun angle. La forme est conservée.",
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
          "La carte IGN au 1/25 000 est celle des randonneurs de La Réunion : 4 cm entre deux gîtes, et l'on sait qu'il y a 1 km à marcher. L'architecte travaille au 1/50, le cadastre au 1/2 000.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Galilée, en 1638, explique qu'un animal ne peut pas être agrandi indéfiniment : son poids croît comme le cube quand la résistance de ses os croît comme le carré. C'est la première fois qu'une proportion explique une forme vivante.",
      },
    },
  },
  {
    titre: "Lire une échelle",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Le dénominateur dit de combien on a réduit",
      sousPhrase:
        "Au 1 sur 500, un centimètre du plan vaut 500 centimètres en vrai, c'est-à-dire 5 mètres. Le premier nombre est le plan, le second la réalité — dans la même unité.",
      encadre: {
        titre: "Contre-intuitif",
        texte:
          "Plus le dénominateur est GRAND, moins la carte montre de détails. Le 1 sur 100 montre un appartement, le 1 sur 100 000 un département.",
      },
    },
  },
  {
    titre: "Dans quel sens calculer ?",
    badge: "La seule question à se poser",
    section: {
      type: "etapes",
      etapes: [
        "Est-ce que je vais vers le PLUS GRAND, ou vers le PLUS PETIT ?",
        "Du plan vers la réalité : je MULTIPLIE par le dénominateur.",
        "De la réalité vers le plan : je DIVISE par le dénominateur.",
        "Je convertis toujours dans la même unité AVANT de calculer.",
        "⚠️ L'erreur la plus fréquente n'est pas le calcul, c'est la conversion — un facteur cent se glisse vite.",
      ],
    },
  },
  {
    titre: "Le piège de l'année",
    badge: "Ce qui coûte le plus de points",
    section: {
      type: "objectif",
      phrase: "Doubler les longueurs ne double pas l'aire : elle QUADRUPLE",
      sousPhrase:
        "Une aire est un produit de deux longueurs. Chacune est multipliée par 2, donc l'aire l'est par 2 fois 2, c'est-à-dire 4. On ne le retient pas : on le compte sur un quadrillage.",
      encadre: {
        titre: "Et pour les volumes",
        texte:
          "Un volume est un produit de trois longueurs : il est multiplié par 2 fois 2 fois 2, soit 8. Une maquette au 1 sur 10 contient un millième du vrai.",
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
          titre: "Lire une échelle",
          texte:
            "Le dénominateur est le nombre par lequel la réalité a été divisée. On multiplie 1 cm par ce nombre, puis on convertit.",
        },
        {
          titre: "Passer d'une distance à l'autre",
          texte:
            "Vers la réalité, on multiplie. Vers le plan, on divise. Et on convertit avant de calculer.",
        },
        {
          titre: "Calculer avec un rapport",
          texte:
            "On identifie la grandeur : longueur, on multiplie par k. Aire, par k au carré. Volume, par k au cube.",
        },
        {
          titre: "Retrouver le rapport",
          texte:
            "On divise une longueur de l'image par celle du modèle. Jamais on ne soustrait.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "Sur une carte de La Réunion au 1 sur 25 000, deux villages sont distants de 4 centimètres.",
      question: "Quelle distance les sépare réellement ?",
      correction:
        "On va du plan vers la réalité, donc on multiplie : 4 fois 25 000 égale 100 000 centimètres. Un kilomètre valant 100 000 centimètres, la distance est de 1 kilomètre. Attention : la difficulté est la conversion, pas la multiplication.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Il faut 3 pots de peinture pour repeindre un panneau.",
      question: "Combien en faut-il pour un panneau deux fois plus long ET deux fois plus haut ?",
      indice: "La peinture se compte à la surface, pas à la longueur.",
      correction:
        "Les deux dimensions sont multipliées par 2, donc l'aire est multipliée par 4. Il faut 3 fois 4, soit 12 pots. Répondre 6 pots, c'est traiter une aire comme une longueur.",
    },
  },
];
