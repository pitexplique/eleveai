// ─── Fiche de cours : le cercle et le disque (6e) ─────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/cercle.bank.ts, notionId cercle_disque).
//
// ⭐ PREMIÈRE FICHE DE 6ᵉ ÉCRITE PAR CETTE SESSION, et elle a été choisie sur
// MESURE : le coach de 6ᵉ compte 35 notions pour 18 fiches, et sur les
// 17 notions orphelines, quatre micro-compétences tombent sous le seuil de
// variété (`quadrilatere_identifier_nature` 7 énoncés, `quadrilatere_propriete_defi`
// 8, `vision_defi` 8, `quadrilatere_distinguer` 9). ⛔ On n'écrit donc PAS les
// fiches de `quadrilatere_propriete` ni de `vision_espace` avant réparation de
// leur banque : une fiche ne répare pas un coach qui se répète.
// ✅ Les six micros de `cercle_disque`, elles, sont toutes au-dessus du seuil.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment :
//   cercle_vocabulaire  → [OA] est un rayon, [AB] qui passe par O un diamètre ;
//        rayon 4 → diamètre 8 ; diamètre 10 → rayon 5 ; ⭐ « combien un cercle
//        a-t-il de rayons ? » → UNE INFINITÉ ; et l'instrument : un compas
//        écarté de 3 cm, pas une règle.
//   cercle_ensemble     → ⭐ « le cercle de centre O et de rayon 3 cm, c'est
//        l'ensemble des points situés… » → À EXACTEMENT 3 cm de O. Un point à
//        4 cm quand le rayon vaut 5 est DANS le disque mais PAS sur le cercle.
//        Et un segment qui joint deux points du cercle sans passer par O est une
//        CORDE.
//   cercle_distance     → la chèvre attachée par 8 m broute un DISQUE de rayon
//        8 m ; un arbre à 9 m est hors d'atteinte ; les points à 3 cm de A et
//        4 cm de B avec AB = 5 cm sont DEUX.
//   cercle_proportionnel → on double le diamètre, le tour double ; tour ÷ diamètre
//        donne TOUJOURS le même nombre, environ 3,14 ; d = 1 → 3,14 ; d = 3 →
//        9,42 ; deux roues de 20 et 60 cm : la grande fait 3 fois le tour.
//   cercle_perimetre    → $P = \pi \times d$ et $P = 2 \times \pi \times r$ ;
//        d = 10 → 31,4 ; r = 3 → 18,84 ; et l'inverse : P = 31,4 → d = 10.
//   cercle_defi         → roue de vélo d = 70 cm → 219,8 cm ; rond-point d = 20 m
//        → 62,8 m ; ⭐ un bassin de La Réunion de tour 15,7 m → rayon 2,5 m ;
//        et « pourquoi 3,14 et pas 3 ? » → parce que le tour vaut un peu PLUS
//        de trois diamètres.
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐⭐ LE CONTRE-EXEMPLE EST UNE HISTOIRE DE FRONTIÈRE, et il est superbe :
//     « Une borne de secours couvre tout ce qui est À MOINS DE 500 m d'elle.
//       Une case est à 500 m exactement. Est-elle couverte ? »
//     → NON : « à moins de 500 m » exclut la distance 500 m elle-même.
// C'est le même bug que le « au moins 10 » de l'algorithmique : la valeur qui
// tombe pile sur la limite. Et ici, cette limite EST le cercle — le cercle est
// exactement l'ensemble des points qui tombent pile dessus. La notion et
// l'erreur sont le même objet, ce qui n'arrive pas souvent.
//
// ⭐ `cercle` SE MET À L'ÉCHELLE, CONTRAIREMENT À `solide_3d` — vérifié dans son
// code avant de m'en servir. Son centre, son rayon et tous ses points sont des
// PARAMÈTRES : réduire le cadre en réduisant les coordonnées dans le même
// rapport met vraiment le dessin à l'échelle, il ne le rogne pas.
// ⚠️ ET IL LE FAUT. Ses polices sont FIXES (14 et 15 px) : avec le cadre de 340
// par défaut, une carte de 222 px les ramènerait à 14 × 222/340 = 9,1 px, sous
// le seuil de 11. Avec un cadre de 228, on obtient 13,6 px. **Ne jamais laisser
// la taille par défaut de ce canvas dans une fiche.**

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/** Le cadre commun à tous les cercles de la fiche — voir l'en-tête : les
 *  coordonnées sont réduites AVEC lui, sinon le dessin serait rogné.
 *
 * ⛔ ET LA MARGE DU HAUT EST CALCULÉE, PAS CHOISIE. Le composant pose l'étiquette
 * d'un point à `(x + 12, y − 10)`, en 15 px bordés d'un contour blanc de 3 : le
 * haut du texte se trouve donc 28 unités au-dessus du point. Avec un centre à 88
 * et un rayon de 62, le point du sommet était à 26 — son étiquette sortait du
 * cadre par le haut de 1,1 px, et ÇA NE SE VOYAIT QU'EN 1280. Le centre est
 * descendu à 96 pour laisser 34 unités : il en faut 28.
 * ⚠️ Le cadre s'est allongé en conséquence : le point extérieur de la figure de
 * la frontière est posé 22 unités sous le cercle, soit à 180. */
const CADRE = { width: 228, height: 195 };
const CX = 114;
const CY = 96;
const R = 62;

/** Un dessin et sa phrase, sous lui. La phrase passe par `TexteMath` — les
 *  libellés à l'intérieur du dessin, tracés en `<text>` SVG, restent en clair. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// LE VOCABULAIRE, EN UNE FIGURE.
//
// ⛔ ET UNE CONTRAINTE DU CANVAS QUI NE SE DEVINE PAS : le libellé d'un DIAMÈTRE
// tombe toujours sur le centre. Le composant pose l'étiquette d'un segment à son
// MILIEU, remontée de 12 — or le milieu d'un diamètre EST le centre, par
// définition. L'étiquette « diamètre » se superposait donc au « O », mesuré, et
// aucune géométrie ne peut l'éviter : incliner le diamètre, le mettre vertical,
// rien n'y fait, son milieu reste O.
// 👉 Sur un diamètre, on choisit : ou bien son libellé, ou bien le « O », jamais
// les deux. Ici on garde « O » et les extrémités B et C — la légende dit que
// [BC] est un diamètre, et le tableau des quatre mots le redit. Le mot « rayon »,
// lui, reste sur son segment : le milieu de [OA] n'est pas le centre.
const cercleVocabulaire = (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: CADRE,
      circle: { cx: CX, cy: CY, r: R, showCircle: true },
      points: [
        { id: "O", x: CX, y: CY, label: "O", highlight: true },
        { id: "A", x: CX, y: CY - R, label: "A" },
        { id: "B", x: CX - R, y: CY, label: "B" },
        { id: "C", x: CX + R, y: CY, label: "C" },
      ],
      segments: [
        { id: "r", kind: "rayon", from: "O", to: "A", label: "rayon" },
        // ⛔ Pas de `label` ici : il se poserait sur le « O ». Voir ci-dessus.
        { id: "d", kind: "diametre", from: "B", to: "C" },
      ],
      display: { showLabels: true, showPoints: true, showCenter: true },
    }}
  />
);

// ⭐⭐ LA FRONTIÈRE, ET LES TROIS POSITIONS POSSIBLES. Le disque est colorié, le
// cercle est son bord. M est DESSUS (à exactement r de O), N est DEDANS (plus
// près), P est DEHORS (plus loin). C'est la figure qui répond au contre-exemple
// de la banque : « à moins de » range la case du côté de N, « à exactement »
// du côté de M, et ce sont deux endroits différents.
const cercleFrontiere = (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: CADRE,
      circle: { cx: CX, cy: CY, r: R, showCircle: true, showDisk: true },
      points: [
        { id: "O", x: CX, y: CY, label: "O", highlight: true },
        { id: "M", x: CX, y: CY - R, label: "M" },
        { id: "N", x: CX + 31, y: CY + 22, label: "N" },
        { id: "P", x: CX, y: CY + R + 22, label: "P" },
      ],
      display: { showLabels: true, showPoints: true, showCenter: true, showDisk: true },
    }}
  />
);

// LE DIAMÈTRE COTÉ — la figure qui accompagne le calcul. Un seul segment, un
// seul nombre : c'est tout ce dont la formule a besoin.
// ⛔ ICI, C'EST LE « O » QUI SAUTE, et c'est l'autre branche du choix expliqué
// plus haut : la mesure est la seule information qui compte dans ce dessin, donc
// c'est elle qui garde l'étiquette. Le centre reste dessiné — `highlight` le
// marque d'un point —, il n'est simplement pas nommé.
// ⚠️ RÉUTILISÉ AVEC D'AUTRES MESURES (le rond-point, la chèvre) → une FONCTION
// qui prend son libellé, jamais une constante recopiée.
const cercleCote = (opts: { mesure: string; disque?: boolean }) => (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: CADRE,
      circle: { cx: CX, cy: CY, r: R, showCircle: true, showDisk: opts.disque },
      points: [
        { id: "O", x: CX, y: CY, label: "", highlight: true },
        { id: "B", x: CX - R, y: CY, label: "" },
        { id: "C", x: CX + R, y: CY, label: "" },
      ],
      segments: [
        { id: "d", kind: "diametre", from: "B", to: "C", label: opts.mesure },
      ],
      display: { showLabels: true, showPoints: true, showCenter: true, showDisk: opts.disque },
    }}
  />
);

// LES QUATRE MOTS, ET CE QUI LES DISTINGUE. Le vocabulaire du cercle est
// piégeux parce que trois de ces mots désignent des segments qui se ressemblent :
// seule leur position par rapport au centre les sépare.
const tableauMots = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["le mot", "ce que c'est", "et le centre ?"],
      rows: [
        { values: ["le rayon", "du centre au bord", "il en part"] },
        { values: ["le diamètre", "d'un bord à l'autre", "il passe par lui"] },
        { values: ["une corde", "d'un bord à l'autre", "elle l'évite"] },
        { values: ["le disque", "le bord ET l'intérieur", "il le contient"] },
      ],
      highlight: { row: 2 },
      caption: "un diamètre est la plus longue des cordes",
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ LE TABLEAU DE PROPORTIONNALITÉ, ET C'EST LE CANVAS QUI LE DIT. Le tour est
// proportionnel au diamètre : doubler l'un double l'autre, et le quotient
// tour ÷ diamètre vaut toujours le même nombre. Ce nombre, c'est π.
// Les quatre couples viennent de la banque, à la décimale près.
// ⚠️ `missing: []` — aucune case vide : dans une fiche de cours on MONTRE le
// tableau rempli, on ne fait pas passer un exercice.
const tableauProportionnalite = (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 4,
      rowLabels: ["diamètre (cm)", "tour (cm)"],
      values: [
        ["1", "2", "3", "10"],
        ["3,14", "6,28", "9,42", "31,4"],
      ],
      missing: [],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
    }}
  />
);

// ⭐⭐ π DESSINÉ. La banque demande « pourquoi 3,14 et pas 3 ? » et attend
// « parce que le tour vaut un peu plus de 3 diamètres ». Le voici : trois
// diamètres posés bout à bout le long du tour, et il reste un petit morceau.
// C'est la seule façon de faire comprendre que π n'est pas une décoration.
// ⚠️ Les valeurs sont NUMÉRIQUES pour que les parts soient à l'échelle. Le
// composant impose un plancher de 12 % de la barre, donc le reste (4,5 %)
// s'affiche un peu plus large qu'il n'est — il reste visiblement le plus petit,
// et c'est ce que le dessin doit dire.
// ⚠️ Hauteur 200 : sous 180, l'étiquette des parts et la phrase du bas se
// frôlent (mesuré en 1280 sur les fiches de 4ᵉ).
const barrePi = (width: number) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width, height: 200 },
      total: "le tour",
      parts: [
        { label: "d", value: "1", color: "#dbeafe" },
        { label: "d", value: "1", color: "#dbeafe" },
        { label: "d", value: "1", color: "#dbeafe" },
        { label: "reste", value: "0,14", color: "#fef3c7" },
      ],
      questionLabel: "3 diamètres, et un peu plus",
      display: { showTotal: true, showPartLabels: true, showValues: false, showQuestion: true },
    }}
  />
);

// REMONTER DU TOUR AU DIAMÈTRE. Si le tour est la donnée, on divise par π au
// lieu de multiplier. 31,4 et 10 sont les nombres de la banque.
const calculInverse = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["31,4", "3,14"],
      division: { dividende: "31,4", diviseur: "3,14", quotient: "10", reste: "0" },
      display: { showResult: true, compact: true },
      questionLabel: "P = 31,4 cm donc d = 31,4 ÷ 3,14",
    }}
  />
);

const pieges = [
  "Confondre le cercle et le disque : le cercle est le TOUR seul, le disque est le tour ET tout l'intérieur. Un point à 4 cm du centre, quand le rayon vaut 5 cm, est dans le disque mais pas sur le cercle.",
  "Confondre rayon et diamètre dans la formule : $P = \\pi \\times d$ utilise le DIAMÈTRE. Avec le rayon, il faut doubler d'abord : $P = 2 \\times \\pi \\times r$. Oublier ce 2 divise le résultat par deux.",
  "Croire que « à moins de 500 m » inclut 500 m : non. « À moins de » exclut la distance elle-même, « à 500 m au plus » l'inclut. C'est exactement la différence entre l'intérieur du disque et le disque entier.",
];

const aRetenir = [
  "Le cercle de centre O et de rayon r est l'ensemble des points situés à EXACTEMENT r de O. Le disque y ajoute tout l'intérieur.",
  "Le diamètre vaut deux fois le rayon, et c'est la plus longue des cordes. Un cercle a une infinité de rayons, tous de même longueur.",
  "Le tour d'un disque est proportionnel à son diamètre, et le coefficient est π ≈ 3,14 : $P = \\pi \\times d = 2 \\times \\pi \\times r$.",
];

export const ficheCercleDisque6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "cercle-disque",
  titre: "Le cercle et le disque",
  accroche:
    "Un cercle n'est pas une forme ronde : c'est une DISTANCE. Tous ses points sont à la même distance du centre, ni plus près ni plus loin — et c'est cette définition-là qui explique tout le reste, le compas, le vocabulaire, et jusqu'à la zone qu'une chèvre attachée peut brouter. Le disque, lui, ajoute l'intérieur.",
  identite: [
    { label: "Le mot clé", valeur: "Tous les points à la même distance du centre" },
    { label: "La différence", valeur: "Le cercle est le tour, le disque est le plein" },
    { label: "La règle d'or", valeur: "$P = \\pi \\times d$, avec le DIAMÈTRE" },
  ],
  definition: {
    texte:
      "Le cercle de centre O et de rayon r est l'ensemble des points situés à une distance de O égale à r — exactement r, ni plus, ni moins. Le disque de centre O et de rayon r ajoute à ce contour tout ce qu'il enferme : les points situés à une distance INFÉRIEURE OU ÉGALE à r. Le rayon est un segment qui joint le centre à un point du cercle ; le diamètre joint deux points du cercle en passant par le centre, et il vaut donc deux rayons. Un segment qui joint deux points du cercle sans passer par le centre s'appelle une corde.",
  },
  figure: {
    schema: legende(
      cercleVocabulaire,
      "$[OA]$ est un rayon, $[BC]$ un diamètre : $BC = 2 \\times OA$"
    ),
    legende:
      "Le compas dessine un cercle parce qu'il garde un écartement CONSTANT : sa pointe est le centre, son écartement le rayon. Un cercle possède une infinité de rayons — tous les segments allant de O au tour — et ils ont tous la même longueur.",
  },
  proprietes: [
    {
      titre: "Quatre mots à ne pas confondre",
      micros: ["cercle_vocabulaire"],
      texte:
        "Rayon, diamètre et corde sont tous des segments : ce qui les distingue est leur rapport au centre. Le rayon en part, le diamètre le traverse, la corde l'évite. Et le diamètre vaut deux rayons : rayon 4 cm, diamètre 8 cm.",
      schema: tableauMots,
    },
    {
      titre: "Dessus, dedans, dehors",
      micros: ["cercle_ensemble"],
      texte:
        "M est sur le cercle : sa distance à O vaut exactement le rayon. N est plus près : il est dans le disque, mais pas sur le cercle. P est plus loin : il est en dehors des deux.",
      schema: cercleFrontiere,
    },
    {
      titre: "Le tour est proportionnel au diamètre",
      micros: ["cercle_proportionnel"],
      texte:
        "Doublez le diamètre, le tour double ; triplez-le, le tour triple. Et si l'on divise le tour par le diamètre, on retombe TOUJOURS sur le même nombre, quel que soit le disque : environ 3,14.",
      schema: tableauProportionnalite,
    },
    {
      titre: "Ce nombre s'appelle π",
      micros: ["cercle_perimetre"],
      texte:
        "Ce coefficient de proportionnalité est $\\pi$, qui vaut un peu plus de 3 : le tour d'un disque fait trois diamètres et des poussières. D'où $P = \\pi \\times d$, avec $\\pi \\approx 3{,}14$.",
      schema: barrePi(228),
    },
  ],
  reel: {
    texte:
      "Le cercle est partout où il y a une distance à ne pas dépasser. Une chèvre attachée à un piquet par une corde de 8 mètres broute un disque de 8 mètres de rayon, et un arbre à 9 mètres reste hors d'atteinte. Une antenne, une borne de secours, un arroseur automatique couvrent de même un disque, et leur portée en est le rayon. Le périmètre, lui, se calcule dès qu'on fait le tour : un rond-point de 20 mètres de diamètre demande 62,8 mètres de peinture au sol, une roue de vélo de 70 cm de diamètre avance de 219,8 cm à chaque tour — c'est ainsi qu'un compteur de vélo mesure une distance sans rien connaître de la route. Et à La Réunion, un bassin rond dont le tour mesure 15,7 m a un rayon de 2,5 m : on remonte du tour à la dimension, dans l'autre sens.",
  },
  historique: {
    texte:
      "Personne n'a « inventé » π : on a mis des siècles à le mesurer. Vers 250 avant notre ère, Archimède a trouvé une méthode qui ne demande aucun instrument nouveau — enfermer le cercle entre deux polygones, l'un dedans, l'autre dehors, et calculer leurs périmètres. Avec des polygones de 96 côtés, il obtient que π est compris entre $3 + \\frac{10}{71}$ et $3 + \\frac{1}{7}$, soit entre 3,1408 et 3,1429. C'est juste, et c'est encore l'encadrement qu'on apprend au collège. La lettre grecque π, elle, n'arrive qu'en 1706 : c'est le Gallois William Jones qui la choisit, pour l'initiale de « périmètre » en grec.",
  },
  formule: {
    contexte: "Le tour d'un disque",
    expression:
      "$P = \\pi \\times d$   ·   $P = 2 \\times \\pi \\times r$   ·   $d = 2 \\times r$",
    legende:
      "Les deux premières sont la MÊME formule, puisque le diamètre vaut deux rayons. ⚠️ Le piège est de prendre le rayon dans la première : on trouve alors la moitié du bon résultat. On prend $\\pi \\approx 3{,}14$ au collège.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : la barre des trois diamètres, juste
    // au-dessus, montre d'où vient le π ; le tableau de proportionnalité montre
    // qu'il est constant. Un troisième dessin ne dirait rien de neuf.
  },
  methode: [
    {
      titre: "Rayon ou diamètre ?",
      micros: ["cercle_vocabulaire"],
      texte:
        "On regarde d'abord ce que l'énoncé donne. S'il donne le rayon, on le double avant d'appliquer $P = \\pi \\times d$ — ou l'on utilise directement $P = 2 \\times \\pi \\times r$. C'est l'erreur la plus fréquente de toute la notion.",
      schema: tableauMots,
    },
    {
      titre: "Multiplier par π",
      micros: ["cercle_perimetre"],
      texte:
        "Une fois le diamètre connu, on multiplie par 3,14. Pour un diamètre de 10 cm : $3{,}14 \\times 10 = 31{,}4$ cm. Le résultat est une longueur, donc en cm — et il est un peu plus de trois fois le diamètre, ce qui permet de le contrôler d'un coup d'œil.",
      schema: cercleCote({ mesure: "d = 10 cm" }),
    },
    {
      titre: "Ou remonter au diamètre",
      micros: ["cercle_perimetre", "cercle_defi"],
      texte:
        "Si c'est le tour qui est donné, on fait l'opération inverse : on divise par $\\pi$. Un tour de 31,4 cm vient d'un diamètre de $31{,}4 \\div 3{,}14 = 10$ cm, donc d'un rayon de 5 cm.",
      schema: calculInverse,
    },
  ],
  usages: [
    {
      titre: "Une zone d'action",
      micros: ["cercle_distance"],
      detail:
        "Une chèvre attachée par une corde de 8 m broute un disque de 8 m de rayon. Une antenne, un arroseur, une borne de secours : même figure, et leur portée est le rayon.",
      schema: cercleCote({ mesure: "portée 8 m", disque: true }),
    },
    {
      titre: "Faire le tour",
      micros: ["cercle_perimetre", "cercle_defi"],
      detail:
        "Un rond-point de 20 m de diamètre a un tour de $3{,}14 \\times 20 = 62{,}8$ m. C'est la longueur de peinture, de bordure ou de barrière à prévoir.",
      schema: tableauProportionnalite,
    },
    {
      titre: "Remonter à la dimension",
      micros: ["cercle_defi"],
      detail:
        "Un bassin rond dont le tour mesure 15,7 m : son diamètre vaut $15{,}7 \\div 3{,}14 = 5$ m, donc son rayon 2,5 m. On mesure ce qui est accessible, on en déduit le reste.",
      schema: calculInverse,
    },
  ],
  exemples: [
    {
      titre: "Du rayon au diamètre",
      micros: ["cercle_vocabulaire"],
      donnees: "Un cercle a un rayon de 4 cm.",
      question: "Combien mesure son diamètre, et combien a-t-il de rayons ?",
      schema: cercleVocabulaire,
      solution:
        "Le diamètre vaut deux rayons : $2 \\times 4 = 8$ cm. Quant au nombre de rayons, il y en a une INFINITÉ — tout segment joignant le centre à un point du cercle en est un, et il y a une infinité de points sur un cercle. Ils ont tous la même longueur, 4 cm : c'est même la définition du cercle.",
    },
    {
      titre: "Le tour d'un rond-point",
      micros: ["cercle_perimetre", "cercle_defi"],
      donnees: "Un rond-point a un diamètre de 20 m. On prend $\\pi \\approx 3{,}14$.",
      question: "Quelle longueur parcourt-on en en faisant tout le tour ?",
      schema: cercleCote({ mesure: "d = 20 m" }),
      solution:
        "On applique $P = \\pi \\times d = 3{,}14 \\times 20 = 62{,}8$ m. ⭐ Contrôle de bon sens : le tour doit valoir un peu plus de trois diamètres, c'est-à-dire un peu plus de 60 m — 62,8 convient. ⚠️ Si l'énoncé avait donné le RAYON (10 m), il aurait fallu le doubler d'abord, ou écrire $P = 2 \\times 3{,}14 \\times 10$. Prendre $3{,}14 \\times 10$ aurait donné 31,4 m, soit la moitié du bon résultat.",
    },
    {
      titre: "La case à 500 mètres",
      micros: ["cercle_distance", "cercle_ensemble"],
      donnees: "Une borne de secours couvre tout ce qui se trouve À MOINS DE 500 m d'elle. Une case est à 500 m exactement.",
      question: "Est-elle couverte ?",
      schema: cercleFrontiere,
      solution:
        "Non. « À moins de 500 m » signifie strictement moins : la distance 500 m elle-même est exclue. La case est donc sur le cercle de rayon 500 m, pas à l'intérieur — comme le point M du dessin, et non comme N. ⭐ Si l'énoncé avait dit « à 500 m AU PLUS », elle aurait été couverte : ce serait le disque entier. Un mot change, la frontière bascule d'un côté ou de l'autre — et le cercle est précisément cette frontière.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un cercle a un rayon de 4 cm. Combien mesure son diamètre ?",
      correction:
        "8 cm : le diamètre vaut toujours deux fois le rayon. Et réciproquement, un cercle de diamètre 10 cm a un rayon de 5 cm.",
      micros: ["cercle_vocabulaire"],
    },
    {
      question: "Quelle est la différence entre le cercle et le disque de centre O et de rayon 4 cm ?",
      correction:
        "Le cercle est le TOUR seul — les points à exactement 4 cm de O. Le disque comprend aussi tout l'intérieur, c'est-à-dire les points à 4 cm ou moins. Le cercle est le bord du disque.",
      micros: ["cercle_ensemble"],
    },
    {
      question: "Une chèvre est attachée à un piquet par une corde de 8 m, dans un pré plat. Quelle est la forme de la zone où elle peut brouter ? Peut-elle atteindre un arbre situé à 9 m du piquet ?",
      correction:
        "Un disque de 8 m de rayon : elle atteint tous les points à 8 m ou moins du piquet. L'arbre est à 9 m, donc hors du disque — elle ne peut pas l'atteindre.",
      micros: ["cercle_distance"],
    },
    {
      question: "Un disque de diamètre 1 m a un tour de 3,14 m. Quel est le tour d'un disque de diamètre 3 m ?",
      correction:
        "9,42 m. Le tour est proportionnel au diamètre : en triplant le diamètre, on triple le tour, donc $3 \\times 3{,}14 = 9{,}42$.",
      micros: ["cercle_proportionnel"],
    },
    {
      question: "Un disque a un diamètre de 10 cm. Calcule son périmètre ($\\pi \\approx 3{,}14$).",
      correction:
        "$P = \\pi \\times d = 3{,}14 \\times 10 = 31{,}4$ cm. ⚠️ Attention à ne pas confondre avec le rayon : si l'énoncé donnait un rayon de 10 cm, le périmètre vaudrait $2 \\times 3{,}14 \\times 10 = 62{,}8$ cm.",
      micros: ["cercle_perimetre"],
    },
    {
      question: "Pourquoi utilise-t-on 3,14 et pas exactement 3 pour calculer le tour d'un disque ?",
      correction:
        "Parce que le tour vaut un peu PLUS de trois diamètres. En posant trois diamètres bout à bout le long du tour, il reste un petit morceau — environ 0,14 diamètre. Prendre 3 donnerait un résultat systématiquement trop petit.",
      micros: ["cercle_defi", "cercle_proportionnel"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX, et le
// code serait projeté en clair au tableau devant la classe.
export const slidesCercleDisque6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Cercle et disque - 6e",
    section: {
      type: "objectif",
      phrase: "Un cercle n'est pas une forme, c'est une distance",
      sousPhrase:
        "Tous ses points sont à la même distance du centre. Le compas ne fait rien d'autre : il garde un écartement constant.",
      encadre: {
        titre: "L'idée",
        texte: "Le cercle est le tour ; le disque est le tour ET tout l'intérieur.",
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
          "Une chèvre attachée par 8 m broute un disque de 8 m de rayon. Une antenne, un arroseur, une borne de secours : même figure. Et une roue de vélo de 70 cm de diamètre avance de 219,8 cm par tour.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 250 avant notre ère, Archimède a coincé le cercle entre deux polygones de 96 côtés, l'un dedans, l'autre dehors : il en a déduit que π est entre 3,1408 et 3,1429. La lettre π, elle, date de 1706.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "P = π × d, avec le DIAMÈTRE",
      sousPhrase:
        "Si l'énoncé donne le rayon, on le double d'abord — ou on écrit P = 2 × π × r. Oublier ce 2 divise le résultat par deux.",
      encadre: {
        titre: "Le contrôle",
        texte: "Le tour vaut toujours un peu plus de 3 diamètres. Un diamètre de 20 m donne 62,8 m : c'est cohérent.",
      },
    },
  },
  {
    titre: "Le vocabulaire",
    badge: "4 mots",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le rayon", texte: "Du centre au bord. Il y en a une infinité, tous de même longueur." },
        { titre: "Le diamètre", texte: "D'un bord à l'autre EN PASSANT par le centre. Il vaut deux rayons." },
        { titre: "Une corde", texte: "D'un bord à l'autre en ÉVITANT le centre. Le diamètre est la plus longue." },
        { titre: "Le disque", texte: "Le tour et tout l'intérieur. Le cercle n'est que le bord." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheCercleDisque6e.methode.map((m) => ({
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
      cartes: ficheCercleDisque6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "La case à 500 mètres",
    section: {
      type: "exemple",
      enonce: "Une borne couvre tout ce qui est à MOINS DE 500 m. Une case est à 500 m exactement.",
      question: "Est-elle couverte ?",
      correction:
        "Non : « à moins de » exclut 500 m. Elle est SUR le cercle, pas dedans. Avec « à 500 m au plus », elle l'aurait été.",
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
      enonce: "Un disque a un diamètre de 10 cm.",
      question: "Quel est son périmètre (π ≈ 3,14) ?",
      indice: "P = π × d, et le diamètre est déjà donné.",
      correction: "3,14 × 10 = 31,4 cm. Un peu plus de trois fois 10 : c'est cohérent.",
    },
  },
];
