// ─── Fiche de cours : calculer un volume (3e) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/volumes.bank.ts, notionId `volume_solide`, 76 items).
//
// ⚠️ LA 3e PORTE DEUX NOTIONS DE VOLUMES, ET IL A FALLU LE VÉRIFIER AVANT
// D'ÉCRIRE — c'est le piège qui avait faussé la fiche de proportionnalité.
// Mesuré : `volume_geometrie_espace`, qui a déjà sa fiche, couvre
// `volume_representation`, `volume_section` et `volume_solide_reconnaitre` —
// autrement dit LES FORMES : comment on les dessine, comment on les coupe,
// comment on les nomme. `volume_solide`, ici, couvre LES CALCULS : les formules,
// les unités, et les deux nouveautés de l'année. Aucun recouvrement.
//
// ⭐⭐ DEUX MICROS SUR HUIT N'EXISTENT PAS EN 4e, ET CE SONT ELLES QUI PORTENT LA
// FICHE. Le pavé, le prisme et le cylindre se calculaient déjà l'an dernier ;
// ce qui arrive en 3e, c'est :
//   · LA BOULE, avec sa formule qui n'obéit à aucune des précédentes —
//     $V = \frac{4}{3}\pi r^3$ ne s'écrit pas « aire de base × hauteur », parce
//     qu'une boule n'a ni base ni hauteur ;
//   · L'AGRANDISSEMENT-RÉDUCTION, où les longueurs multipliées par $k$
//     multiplient le volume par $k^3$. ⭐ Et cela prolonge exactement la fiche
//     `aire-surface` de la même classe, qui enseigne le $k^2$ des aires : la
//     fiche y renvoie, car c'est LA MÊME RÈGLE, à une dimension près.
//
// ⭐ LES 76 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08 :
//   volume_comprendre  → ce que mesure un volume, et pourquoi l'unité est cube
//   volume_pave        → L × l × h, et ⛔ le piège de l'addition
//   volume_prisme      → aire de base × hauteur
//   volume_cylindre    → π r² h, en passant par l'aire du disque
//   volume_boule       → 4/3 π r³, et ⛔ le rayon plutôt que le diamètre
//   volume_agrandissement_reduction → × k³
//   volume_unite       → 1 L = 1 dm³, 1 m³ = 1000 L
//   volume_defi        → solides composés, et comparer deux boules
//
// ⛔ LES QUATRE FAUSSES ÉGALITÉS DE LA BANQUE SONT RECOPIÉES DANS LES PIÈGES :
//     7 + 4 + 3 = 14 cm³ pour un pavé      ·  4π × 3² = 36π pour une boule
//     le diamètre à la place du rayon      ·  un agrandissement de 2 qui
//                                             doublerait le volume
//
// ⛔ ET `solide_3d` A UNE GÉOMÉTRIE CODÉE EN DUR — mesuré le 02/09. Sa face
// avant va jusqu'à x = 222, l'arrière à 270, l'étiquette de profondeur 24 px
// plus loin : il lui faut ~310 de cadre, que le bloc réduit ensuite à 225. Lui
// demander 222 ne le rétrécit pas, ça le COUPE.
// ⚠️ Et il dessine les solides comme des boites de verre, TOUTES ARÊTES PLEINES :
// aucune légende de cette fiche ne parle donc d'arêtes cachées en pointillés,
// puisqu'il n'en trace aucune.

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
// par `scripts/mesurer-largeurs-blocs.mjs`.
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

/**
 * Un solide en perspective.
 * ⛔ LE CADRE VAUT 310, PAS 222. La géométrie de ce canvas est écrite en
 * coordonnées absolues — face arrière jusqu'à x = 270, étiquettes 24 px plus
 * loin. Un cadre à la largeur du bloc rognerait les cotes.
 */
const solide = (data: Record<string, unknown>) => (
  <CanvasRenderer
    figure={
      {
        kind: "solide_3d",
        size: { width: 310, height: 250 },
        // ⛔ showLabels FAUX, ET C'EST MESURE. Quand il est vrai, le canvas
        // ajoute ses PROPRES etiquettes — « base rectangulaire » sous un pave,
        // « πr² cm² » sous un cylindre — qui viennent percuter les cotes qu'on
        // lui passe. Deux chevauchements et un debordement, le 03/09.
        display: { showLabels: false, showDimensions: true },
        ...data,
      } as never
    }
  />
);

export const ficheVolumes3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "volume-solide",
  titre: "Calculer un volume : du pavé à la boule",
  accroche:
    "Un volume compte des cubes. C'est pour cela que son unité s'écrit avec un petit 3 — trois dimensions, trois longueurs multipliées. Presque tous les solides du collège se calculent alors de la même façon, en empilant une base sur une hauteur. La troisième ajoute le seul qui refuse cette règle, parce qu'il n'a ni base ni hauteur : la boule.",
  identite: [
    { label: "La règle générale", valeur: "$V = \\text{aire de la base} \\times \\text{hauteur}$" },
    { label: "L'exception", valeur: "La boule : $V = \\dfrac{4}{3}\\pi r^3$" },
    { label: "Le piège", valeur: "Agrandir de $k$ multiplie le volume par $k^3$, jamais par $k$" },
  ],
  definition: {
    texte:
      "Le volume d'un solide mesure la place qu'il occupe dans l'espace. On le compte en cubes unités : un pavé de 3 sur 2 sur 4 contient $3 \\times 2 \\times 4 = 24$ petits cubes, d'où son volume de $24$ unités cubes. C'est cette origine qui explique l'écriture des unités — $\\text{cm}^3$, $\\text{m}^3$ — et le fait qu'un volume se calcule TOUJOURS en multipliant trois longueurs, jamais en les additionnant.",
  },
  figure: {
    schema: solide({
      solide: "pave_droit",
      dimensions: { longueur: 4, largeur: 2, hauteur: 3 },
      labels: { longueur: "4", largeur: "2", hauteur: "3" },
    }),
    legende:
      "Trois longueurs, trois directions : le volume vaut $4 \\times 2 \\times 3 = 24$ unités cubes. Chaque dimension compte une fois, ce qui donne au résultat son exposant 3.",
  },
  proprietes: [
    {
      titre: "Pourquoi l'unité porte un exposant 3",
      texte:
        "Une longueur se mesure en centimètres, une aire en $\\text{cm}^2$ parce qu'on multiplie deux longueurs, et un volume en $\\text{cm}^3$ parce qu'on en multiplie trois. L'exposant n'est pas décoratif : il COMPTE les dimensions. C'est aussi ce qui permet de repérer une erreur d'un coup d'œil — un résultat de volume annoncé en $\\text{cm}^2$ signale toujours une opération manquante.",
      schema: legende(
        tableau({
          headers: ["on mesure", "on multiplie", "unité"],
          rows: [
            { values: ["une longueur", "rien", "cm"] },
            { values: ["une aire", "2 longueurs", "cm²"] },
            { values: ["un volume", "3 longueurs", "cm³"] },
          ],
          highlight: { row: 2 },
          caption: "l'exposant compte les dimensions",
        }),
        "L'unité est un contrôle gratuit : elle doit suivre le nombre de longueurs multipliées."
      ),
      micros: ["volume_comprendre"],
    },
    {
      titre: "Le pavé droit : on multiplie, on n'additionne pas",
      texte:
        "Le volume d'un pavé droit est le produit de ses trois dimensions : $V = L \\times l \\times h$. Pour un pavé de $7$ cm sur $4$ cm sur $3$ cm, cela donne $84\\ \\text{cm}^3$. ⛔ Écrire $7 + 4 + 3 = 14$ est l'erreur la plus fréquente du chapitre, et l'unité la trahit aussitôt : une somme de centimètres donne des centimètres, jamais des $\\text{cm}^3$. Le cube en est le cas particulier, avec $V = c^3$.",
      schema: legende(
        solide({
          solide: "cube",
          dimensions: { cote: 5 },
          labels: { cote: "5" },
        }),
        "Un cube d'arête 5 : $5 \\times 5 \\times 5 = 125\\ \\text{cm}^3$."
      ),
      micros: ["volume_pave"],
    },
    {
      titre: "Le prisme droit : une base, puis une hauteur",
      texte:
        "Un prisme droit se calcule en deux temps : on trouve l'aire de sa base, puis on la multiplie par la hauteur. $V = \\mathcal{B} \\times h$. Une base de $24\\ \\text{cm}^2$ et une hauteur de $9$ cm donnent $216\\ \\text{cm}^3$. Le pavé droit n'est qu'un prisme dont la base est un rectangle — d'où le fait qu'une seule règle suffise pour les deux.",
      schema: legende(
        solide({
          solide: "prisme",
          dimensions: { aireBase: 24, hauteur: 9 },
          labels: { aireBase: "24", hauteur: "9" },
        }),
        "Aire de base 24, hauteur 9 : $24 \\times 9 = 216\\ \\text{cm}^3$."
      ),
      micros: ["volume_prisme"],
    },
    {
      titre: "Le cylindre : la même règle, avec un disque",
      texte:
        "Un cylindre est un prisme dont la base est un disque. On applique donc la même règle, en calculant d'abord l'aire du disque : $\\mathcal{B} = \\pi r^2$, puis $V = \\pi r^2 h$. ⚠️ Si l'énoncé donne le DIAMÈTRE, il faut le diviser par deux avant tout calcul — c'est le rayon qui figure dans la formule, et l'oublier quadruple le résultat.",
      schema: legende(
        solide({
          solide: "cylindre",
          dimensions: { rayon: 4, hauteur: 7 },
          labels: { rayon: "4", hauteur: "7" },
        }),
        "Rayon 4, hauteur 7 : $\\pi \\times 4^2 \\times 7 = 112\\pi\\ \\text{cm}^3$, soit environ $351{,}68\\ \\text{cm}^3$."
      ),
      micros: ["volume_cylindre"],
    },
    {
      titre: "La boule : la seule qui échappe à la règle",
      texte:
        "Une boule n'a ni base ni hauteur : aucune des formules précédentes ne peut s'y appliquer, et il faut donc en apprendre une nouvelle — $V = \\dfrac{4}{3}\\pi r^3$. Le rayon y figure AU CUBE, ce qui explique qu'une petite différence de rayon change beaucoup le volume. ⛔ Écrire $4\\pi r^2$ est l'erreur classique : elle oublie à la fois le tiers et le cube.",
      schema: legende(
        solide({
          solide: "boule",
          dimensions: { rayon: 3 },
          labels: { rayon: "3" },
        }),
        "Rayon 3 : $\\dfrac{4}{3}\\pi \\times 3^3 = 36\\pi\\ \\text{cm}^3$ — le cube du rayon vaut 27."
      ),
      micros: ["volume_boule"],
    },
    {
      titre: "Agrandir de $k$ multiplie le volume par $k^3$",
      texte:
        "Si l'on multiplie TOUTES les longueurs d'un solide par $k$, son volume est multiplié par $k^3$ — et non par $k$. Doubler les arêtes d'un cube multiplie donc son volume par $8$, pas par $2$. La raison tient en une ligne : trois longueurs interviennent dans le calcul, et chacune est multipliée par $k$. C'est la même logique que pour les aires, où le facteur est $k^2$ parce que deux longueurs interviennent.",
      schema: legende(
        tableau({
          headers: ["on agrandit de", "longueurs", "aires", "volumes"],
          rows: [
            { values: ["k", "× k", "× k²", "× k³"] },
            { values: ["2", "× 2", "× 4", "× 8"] },
            { values: ["1/2", "÷ 2", "÷ 4", "÷ 8"] },
          ],
          highlight: { row: 1 },
          caption: "une dimension, un exposant",
        }),
        "L'exposant est le nombre de dimensions concernées : 1, 2 ou 3."
      ),
      micros: ["volume_agrandissement_reduction"],
    },
    {
      titre: "Les litres sont des décimètres cubes",
      texte:
        "Un litre est exactement le volume d'un cube d'un décimètre d'arête : $1\\ \\text{L} = 1\\ \\text{dm}^3$. Tout le reste s'en déduit. Comme $1\\ \\text{dm} = 10\\ \\text{cm}$, un décimètre cube vaut $10 \\times 10 \\times 10 = 1\\,000\\ \\text{cm}^3$ : un litre fait donc $1\\,000\\ \\text{cm}^3$. Et un mètre cube, qui contient $10 \\times 10 \\times 10$ décimètres cubes, vaut $1\\,000$ litres.",
      schema: legende(
        tableau({
          headers: ["volume", "en litres"],
          rows: [
            { values: ["1 cm³", "0,001 L"] },
            { values: ["1 dm³", "1 L"] },
            { values: ["1 m³", "1 000 L"] },
          ],
          highlight: { row: 1 },
          caption: "chaque saut vaut 1 000",
        }),
        "D'une unité de volume à la suivante, le facteur est $1\\,000$ — et non 10."
      ),
      micros: ["volume_unite"],
    },
    {
      titre: "Un solide composé se découpe",
      texte:
        "Beaucoup d'objets réels sont la réunion de deux solides simples — un cylindre surmonté d'une demi-boule, par exemple. On calcule alors chaque morceau séparément, puis on additionne. ⚠️ Le volume d'une demi-boule est la MOITIÉ de celui de la boule entière, soit $\\dfrac{2}{3}\\pi r^3$ : on divise le résultat, jamais le rayon.",
      schema: legende(
        tableau({
          headers: ["morceau", "sa formule"],
          rows: [
            { values: ["cylindre", "π r² h"] },
            { values: ["demi-boule", "2/3 π r³"] },
            { values: ["le total", "on additionne"] },
          ],
          caption: "on découpe, puis on ajoute",
        }),
        "Chaque morceau garde sa propre formule ; seul le résultat final se cumule."
      ),
      micros: ["volume_defi"],
    },
  ],
  reel: {
    texte:
      "À La Réunion, un récupérateur d'eau de pluie est un cylindre, et connaître son volume en litres décide de l'autonomie d'une maison en saison sèche. Une citerne de $1$ m de rayon et $2$ m de haut contient $\\pi \\times 1^2 \\times 2 \\approx 6{,}28\\ \\text{m}^3$, soit plus de $6\\,000$ litres. Mais l'usage le plus contre-intuitif du chapitre est ailleurs : la règle du $k^3$ explique pourquoi une boule de glace deux fois plus large coûte huit fois plus cher à fabriquer, et pourquoi un modèle réduit au dixième d'un bateau ne pèse pas le dixième, mais le millième.",
  },
  historique: {
    texte:
      "Archimède, au IIIᵉ siècle avant notre ère, démontre qu'une sphère inscrite dans un cylindre occupe exactement les deux tiers de son volume. Il tenait ce résultat pour le plus beau de tous les siens — au point de demander qu'une sphère et son cylindre soient gravés sur sa tombe, avec le rapport $2/3$. Cicéron raconte avoir retrouvé ce tombeau à Syracuse, plus de cent ans après, envahi par les ronces et reconnaissable à cette seule figure. La formule que vous apprenez cette année en découle directement : le volume du cylindre circonscrit vaut $2\\pi r^3$, et les deux tiers en font bien $\\dfrac{4}{3}\\pi r^3$.",
  },
  formule: {
    contexte: "Le volume d'une boule de rayon $r$",
    expression: "V = \\dfrac{4}{3}\\pi r^3",
    legende:
      "C'est la seule formule vraiment neuve de l'année, et la seule qui ne s'écrive pas « aire de base × hauteur » — une boule n'ayant ni l'une ni l'autre. ⚠️ Le rayon est AU CUBE : doubler le rayon multiplie donc le volume par $8$. Et si l'énoncé fournit le diamètre, il faut le diviser par deux avant tout calcul.",
    schema: legende(
      tableau(
        {
          headers: ["rayon", "r³", "volume"],
          rows: [
            { values: ["3", "27", "36π"] },
            { values: ["6", "216", "288π"] },
          ],
          highlight: { row: 1 },
          caption: "rayon doublé, volume × 8",
        },
        "formule"
      ),
      "De 3 à 6, le rayon double et le volume est multiplié par huit : c'est le $k^3$."
    ),
  },
  methode: [
    {
      titre: "Choisir la formule en regardant la base",
      texte:
        "Le solide a-t-il une base plate qui se répète sur toute la hauteur ? Alors $V = \\mathcal{B} \\times h$, qu'elle soit rectangle, triangle ou disque. S'il n'a pas de base — une boule — c'est qu'il faut la formule spécifique. Cette seule question tranche entre presque tous les cas du programme.",
      micros: ["volume_comprendre", "volume_prisme"],
    },
    {
      titre: "Vérifier rayon ou diamètre AVANT de calculer",
      texte:
        "Les formules du cylindre et de la boule contiennent le rayon. Un énoncé qui donne le diamètre exige donc une division par deux en toute première ligne. ⚠️ L'oubli est indolore à l'écriture et fatal au résultat : il multiplie le volume d'un cylindre par 4, et celui d'une boule par 8.",
      micros: ["volume_cylindre", "volume_boule"],
    },
    {
      titre: "Contrôler par l'unité",
      texte:
        "Un volume s'exprime toujours avec un exposant 3. Un résultat en $\\text{cm}^2$ signale une multiplication oubliée, et un résultat sans exposant une addition faite à la place d'un produit.",
      micros: ["volume_comprendre", "volume_pave"],
    },
    {
      titre: "Passer aux litres par les décimètres cubes",
      texte:
        "On convertit d'abord en $\\text{dm}^3$, puis on lit directement le nombre de litres. Le facteur entre deux unités de volume voisines est $1\\,000$ — se tromper de facteur en prenant 10 est l'erreur habituelle des conversions.",
      micros: ["volume_unite"],
    },
    {
      titre: "Devant un agrandissement : compter les dimensions",
      texte:
        "On se demande combien de longueurs interviennent dans la grandeur cherchée. Une : le facteur est $k$. Deux, c'est une aire : $k^2$. Trois, c'est un volume : $k^3$. Aucune formule à retenir, juste un comptage.",
      micros: ["volume_agrandissement_reduction"],
    },
  ],
  usages: [
    {
      titre: "Le solide a une base constante",
      detail:
        "Pavé, prisme, cylindre : je calcule l'aire de la base, puis je multiplie par la hauteur.",
      micros: ["volume_prisme", "volume_pave", "volume_cylindre"],
    },
    {
      titre: "C'est une boule",
      detail:
        "J'applique $\\dfrac{4}{3}\\pi r^3$, après avoir vérifié que je dispose bien du rayon.",
      micros: ["volume_boule"],
    },
    {
      titre: "On me demande une contenance",
      detail:
        "Je convertis en décimètres cubes : le nombre de litres est alors le même nombre.",
      micros: ["volume_unite"],
    },
    {
      titre: "Le solide est agrandi ou réduit",
      detail:
        "Je multiplie le volume initial par $k^3$ — sans jamais refaire le calcul complet.",
      micros: ["volume_agrandissement_reduction"],
    },
    {
      titre: "Le solide est composé de deux morceaux",
      detail:
        "Je calcule chaque morceau avec sa propre formule, puis j'additionne les deux volumes.",
      micros: ["volume_defi"],
    },
  ],
  exemples: [
    {
      titre: "Le récupérateur d'eau",
      donnees: "Un récupérateur cylindrique a un rayon de 40 cm et une hauteur de 100 cm.",
      question: "Quelle est sa contenance en litres ? On prendra $\\pi \\approx 3{,}14$.",
      solution:
        "On applique $V = \\pi r^2 h$ : l'aire de la base vaut $3{,}14 \\times 40^2 = 3{,}14 \\times 1\\,600 = 5\\,024\\ \\text{cm}^2$, puis on multiplie par la hauteur, ce qui donne $502\\,400\\ \\text{cm}^3$. Reste à convertir : $1\\,000\\ \\text{cm}^3$ font un litre, donc on divise par $1\\,000$ et l'on obtient environ $502$ litres. Contrôle de plausibilité : une cuve de $80$ cm de large sur $1$ m de haut, un demi-mètre cube, c'est bien l'ordre de grandeur d'un récupérateur domestique.",
      schema: legende(
        tableau(
          {
            headers: ["étape", "résultat"],
            rows: [
              { values: ["aire de base", "5 024 cm²"] },
              { values: ["× hauteur", "502 400 cm³"] },
              { values: ["÷ 1 000", "502 L"] },
            ],
            highlight: { row: 2 },
            caption: "cm³ vers litres",
          },
          "exemple"
        ),
        "La conversion se fait à la fin, sur un résultat déjà juste."
      ),
      micros: ["volume_cylindre", "volume_unite"],
    },
    {
      titre: "Une boule, et l'erreur à ne pas commettre",
      donnees: "Une boule a un rayon de 3 cm.",
      question: "Donner son volume sous la forme $a\\pi$.",
      solution:
        "On applique $V = \\dfrac{4}{3}\\pi r^3$. Le rayon au cube vaut $3^3 = 27$, donc $V = \\dfrac{4}{3} \\times 27 \\times \\pi$. Or $\\dfrac{4}{3} \\times 27 = 4 \\times 9 = 36$, d'où $V = 36\\pi\\ \\text{cm}^3$. ⛔ Écrire $4\\pi \\times 3^2 = 36\\pi$ donnerait le même nombre par pure coïncidence, mais le raisonnement serait faux : il oublie le tiers ET met le rayon au carré au lieu du cube. Avec un rayon de $6$, cette méthode donnerait $144\\pi$ au lieu de $288\\pi$.",
      micros: ["volume_boule"],
    },
    {
      titre: "On double toutes les arêtes",
      donnees: "Un cube a une arête de 5 cm. On multiplie toutes ses longueurs par 2.",
      question: "Quel est le volume du nouveau cube ?",
      solution:
        "Le volume initial vaut $5^3 = 125\\ \\text{cm}^3$. L'agrandissement a pour rapport $k = 2$, donc le volume est multiplié par $k^3 = 8$ : le nouveau volume est $125 \\times 8 = 1\\,000\\ \\text{cm}^3$. Vérification directe : la nouvelle arête mesure $10$ cm, et $10^3 = 1\\,000$. C'est bien le même résultat. ⛔ Répondre $250\\ \\text{cm}^3$ reviendrait à multiplier par 2 — c'est-à-dire à traiter le volume comme une longueur.",
      schema: legende(
        tableau(
          {
            headers: ["", "arête", "volume"],
            rows: [
              { values: ["avant", "5", "125"] },
              { values: ["après", "10", "1 000"] },
              { values: ["facteur", "× 2", "× 8"] },
            ],
            highlight: { row: 2 },
            caption: "2³ = 8",
          },
          "exemple"
        ),
        "L'arête double, le volume est multiplié par huit."
      ),
      micros: ["volume_agrandissement_reduction"],
    },
    {
      titre: "L'aquarium",
      donnees: "Un aquarium en forme de pavé droit mesure 50 cm sur 30 cm sur 40 cm.",
      question: "Quelle est sa contenance en litres ?",
      solution:
        "Le volume vaut $50 \\times 30 \\times 40 = 60\\,000\\ \\text{cm}^3$. Comme $1$ litre vaut $1\\,000\\ \\text{cm}^3$, la contenance est de $60$ litres. On peut aussi convertir les dimensions d'abord : $5\\ \\text{dm} \\times 3\\ \\text{dm} \\times 4\\ \\text{dm} = 60\\ \\text{dm}^3$, et un décimètre cube étant un litre, on lit le résultat directement. Cette seconde méthode évite les grands nombres, et c'est souvent la plus sûre.",
      micros: ["volume_pave", "volume_unite"],
    },
  ],
  pieges: [
    "Écrire $7 + 4 + 3 = 14\\ \\text{cm}^3$ pour un pavé. Un volume est un PRODUIT de trois longueurs : $7 \\times 4 \\times 3 = 84\\ \\text{cm}^3$.",
    "Écrire $4\\pi r^2$ pour une boule. La formule est $\\dfrac{4}{3}\\pi r^3$ : il manque le tiers, et le rayon est au cube.",
    "Utiliser le diamètre là où la formule demande le rayon. Pour un cylindre, cela multiplie le volume par 4 ; pour une boule, par 8.",
    "Croire qu'un agrandissement de rapport 2 double le volume. Il le multiplie par $2^3 = 8$.",
    "Convertir les volumes de 10 en 10. Entre deux unités de volume voisines, le facteur est $1\\,000$.",
    "Diviser le rayon par deux pour une demi-boule. C'est le VOLUME qu'on divise par deux, pas le rayon.",
    "Annoncer un volume en $\\text{cm}^2$. L'exposant compte les dimensions : un volume en porte toujours trois.",
  ],
  aRetenir: [
    "Un volume est un produit de trois longueurs — d'où l'exposant 3 de son unité.",
    "Pavé, prisme, cylindre : $V = \\text{aire de la base} \\times \\text{hauteur}$.",
    "Cylindre : $V = \\pi r^2 h$, en passant par l'aire du disque.",
    "Boule : $V = \\dfrac{4}{3}\\pi r^3$ — la seule sans base ni hauteur.",
    "$1\\ \\text{L} = 1\\ \\text{dm}^3 = 1\\,000\\ \\text{cm}^3$, et $1\\ \\text{m}^3 = 1\\,000\\ \\text{L}$.",
    "Agrandir de $k$ : longueurs $\\times k$, aires $\\times k^2$, volumes $\\times k^3$.",
  ],
  entrainement: [
    {
      question: "Un pavé droit mesure $8$ cm, $5$ cm et $4$ cm. Quel est son volume ?",
      correction:
        "$8 \\times 5 \\times 4 = 160\\ \\text{cm}^3$. On multiplie les trois dimensions ; les additionner donnerait 17, qui ne serait même pas un volume.",
      micros: ["volume_pave"],
    },
    {
      question: "Un cube a une arête de $6$ cm. Quel est son volume ?",
      correction: "$6^3 = 6 \\times 6 \\times 6 = 216\\ \\text{cm}^3$.",
      micros: ["volume_pave"],
    },
    {
      question:
        "Un prisme droit a une base d'aire $15\\ \\text{cm}^2$ et une hauteur de $4$ cm. Quel est son volume ?",
      correction: "$V = \\mathcal{B} \\times h = 15 \\times 4 = 60\\ \\text{cm}^3$.",
      micros: ["volume_prisme"],
    },
    {
      question:
        "Un cylindre a un rayon de $4$ cm et une hauteur de $7$ cm. Donner son volume sous la forme $a\\pi$.",
      correction:
        "$V = \\pi r^2 h = \\pi \\times 16 \\times 7 = 112\\pi\\ \\text{cm}^3$.",
      micros: ["volume_cylindre"],
    },
    {
      question:
        "Un cylindre a un diamètre de $12$ cm et une hauteur de $5$ cm. Quel est son volume sous la forme $a\\pi$ ?",
      correction:
        "Le diamètre vaut 12, donc le rayon vaut 6. $V = \\pi \\times 6^2 \\times 5 = 180\\pi\\ \\text{cm}^3$. Utiliser 12 au lieu de 6 aurait quadruplé le résultat.",
      micros: ["volume_cylindre"],
    },
    {
      question: "Une boule a un rayon de $6$ cm. Donner son volume sous la forme $a\\pi$.",
      correction:
        "$V = \\dfrac{4}{3}\\pi \\times 6^3 = \\dfrac{4}{3}\\pi \\times 216 = 288\\pi\\ \\text{cm}^3$.",
      micros: ["volume_boule"],
    },
    {
      question: "Dans la formule $V = \\dfrac{4}{3}\\pi r^3$, si le rayon double, par combien le volume est-il multiplié ?",
      correction:
        "Par $8$, car le rayon figure au cube et $2^3 = 8$. C'est le cas particulier de la règle générale des agrandissements.",
      micros: ["volume_boule", "volume_agrandissement_reduction"],
    },
    {
      question: "Un solide de $200\\ \\text{cm}^3$ est agrandi avec un coefficient $3$. Quel est son nouveau volume ?",
      correction:
        "$200 \\times 3^3 = 200 \\times 27 = 5\\,400\\ \\text{cm}^3$.",
      micros: ["volume_agrandissement_reduction"],
    },
    {
      question: "Combien de litres y a-t-il dans $1\\ \\text{m}^3$ ?",
      correction:
        "$1\\,000$ litres. Un mètre cube contient $10 \\times 10 \\times 10$ décimètres cubes, et chaque décimètre cube vaut un litre.",
      micros: ["volume_unite"],
    },
    {
      question:
        "Un pavé droit a un volume de $48\\ \\text{cm}^3$ et une base de $4$ cm sur $3$ cm. Quelle est sa hauteur ?",
      correction:
        "L'aire de la base vaut $4 \\times 3 = 12\\ \\text{cm}^2$. Comme $V = \\mathcal{B} \\times h$, on a $h = 48 \\div 12 = 4$ cm.",
      micros: ["volume_prisme", "volume_defi"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=volume_solide",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres.

export const slidesVolumes3e: ClasseSlide[] = [
  {
    titre: "Un volume compte des cubes",
    badge: "Ce qu'on va faire",
    section: {
      type: "objectif",
      phrase: "Trois longueurs multipliées, trois dimensions",
      sousPhrase:
        "C'est pour cela que l'unité s'écrit avec un petit trois. Un pavé de trois sur deux sur quatre contient vingt-quatre petits cubes : voilà son volume.",
      encadre: {
        titre: "Ce qui arrive cette année",
        texte:
          "La boule, qui n'obéit à aucune des formules connues. Et la règle des agrandissements : multiplier les longueurs par k multiplie le volume par k au cube.",
      },
    },
  },
  {
    titre: "Une seule règle pour presque tout",
    badge: "La base et la hauteur",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le pavé droit",
          texte:
            "Longueur fois largeur fois hauteur. C'est un prisme dont la base est un rectangle.",
        },
        {
          titre: "Le prisme droit",
          texte:
            "Aire de la base multipliée par la hauteur. La base peut être un triangle, un rectangle, n'importe quoi.",
        },
        {
          titre: "Le cylindre",
          texte:
            "Le même geste, avec un disque pour base. On calcule pi r au carré, puis on multiplie par la hauteur.",
        },
      ],
    },
  },
  {
    titre: "L'erreur numéro un",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on lit sur les copies",
        contenu:
          "Sept plus quatre plus trois font quatorze centimètres cubes. On a additionné les trois dimensions.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Sept fois quatre fois trois font quatre-vingt-quatre. Et l'unité le trahit : une somme de centimètres donne des centimètres, jamais des centimètres cubes.",
      },
    },
  },
  {
    titre: "La boule, la seule exception",
    badge: "La formule neuve",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Ni base, ni hauteur",
      sousPhrase:
        "Aucune formule précédente ne peut s'appliquer à une boule. Il faut donc en apprendre une nouvelle : quatre tiers de pi r au cube.",
      encadre: {
        titre: "Le détail qui compte",
        texte:
          "Le rayon est AU CUBE. Doubler le rayon multiplie donc le volume par huit. Et si l'énoncé donne le diamètre, on le divise par deux avant tout calcul.",
      },
    },
  },
  {
    titre: "Compter les dimensions",
    badge: "Les agrandissements",
    section: {
      type: "etapes",
      etapes: [
        "Je me demande combien de longueurs interviennent dans la grandeur cherchée.",
        "Une seule longueur : le facteur est k. C'est le cas d'un périmètre.",
        "Deux longueurs : c'est une aire, le facteur est k au carré.",
        "Trois longueurs : c'est un volume, le facteur est k au cube. Doubler les arêtes d'un cube multiplie son volume par huit.",
      ],
    },
  },
  {
    titre: "Les litres sont des décimètres cubes",
    badge: "Les conversions",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "La définition",
          texte:
            "Un litre est exactement le volume d'un cube d'un décimètre d'arête. Un litre égale un décimètre cube.",
        },
        {
          titre: "Vers les centimètres cubes",
          texte:
            "Un décimètre fait dix centimètres, donc un décimètre cube en fait mille. Un litre vaut mille centimètres cubes.",
        },
        {
          titre: "Le piège des conversions",
          texte:
            "Entre deux unités de volume voisines, le facteur est mille — jamais dix. C'est l'erreur la plus fréquente.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce:
        "Un récupérateur d'eau cylindrique a un rayon de quarante centimètres et une hauteur d'un mètre.",
      question: "Quelle est sa contenance en litres ? On prendra pi environ égal à trois virgule quatorze.",
      correction:
        "On commence par l'aire de la base, qui est un disque : trois virgule quatorze fois quarante au carré, c'est-à-dire trois virgule quatorze fois mille six cents, soit cinq mille vingt-quatre centimètres carrés. On multiplie ensuite par la hauteur, cent centimètres : cela donne cinq cent deux mille quatre cents centimètres cubes. Reste la conversion. Mille centimètres cubes font un litre, donc on divise par mille : environ cinq cent deux litres. Et l'on contrôle l'ordre de grandeur — une cuve de quatre-vingts centimètres de large sur un mètre de haut, un demi-mètre cube : c'est bien la taille d'un récupérateur de jardin.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "Un cube a une arête de cinq centimètres. On multiplie toutes ses longueurs par deux.",
      question: "Quel est le volume du nouveau cube ?",
      indice: "Combien de longueurs interviennent dans un volume ?",
      correction:
        "Le volume de départ vaut cinq au cube, soit cent vingt-cinq centimètres cubes. L'agrandissement a pour rapport deux, et un volume met en jeu trois longueurs : le facteur est donc deux au cube, c'est-à-dire huit. Le nouveau volume vaut cent vingt-cinq fois huit, soit mille centimètres cubes. On peut vérifier directement : la nouvelle arête mesure dix centimètres, et dix au cube font bien mille. Répondre deux cent cinquante reviendrait à multiplier par deux — c'est-à-dire à traiter un volume comme une longueur.",
    },
  },
];
