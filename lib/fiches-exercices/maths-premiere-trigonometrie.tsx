// ─── Fiche d'exercices : la trigonométrie (1re spé) ───────────────────────────
//                              20 exercices corrigés
//
// Cinquième feuille de 1re spé (26/09/2026). Alignée sur la banque
// `lib/tutor-v4/questionBank/premiere-spe/maths/trigonometrie.bank.ts`, renforcée
// le même jour (deux micros neuves, huit générateurs de renfort).
//
// ⭐⭐ LE FIL : UN RÉEL EST UN CHEMIN SUR LE CERCLE, ET LE CERCLE RÉPOND À TOUT.
// On enroule la droite sur le cercle ; le réel devient un point ; son cosinus
// est l'abscisse de ce point, son sinus l'ordonnée. Retirer des tours, changer
// de signe, ajouter π : chaque formule se VOIT comme un déplacement du point.
//
// ⭐ BO 2026 : les deux démonstrations au programme (cos et sin de π/4 et π/3)
// sont les exercices 15 et 16 ; l'exemple d'algorithme (Archimède) est le 18.
//
// ⭐ Les corrigés DESSINENT le cercle (canvas `cercle_trigo`) : le point, l'arc
// parcouru, et les projections avec leurs valeurs, calculées par le canvas —
// jamais saisies à la main. Frédéric (25/09) : « beaucoup de schémas dans les
// corrigés ».
//
// ⛔ Écrit simplement : une phrase par idée, le mot de la classe. Exemples du
// monde (piste d'athlétisme, échelle, grande roue, marée bretonne), pas de La
// Réunion par défaut.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-trigonometrie-premiere.mjs`.
//
// Micro-compétences : trig_radian (1), trig_arc (2), trig_enroulement (3, 17),
// trig_cercle (3, 10, 15, 16), trig_cos_sin (4), trig_triangle_rectangle (5, 14,
// 16, 18), trig_valeurs (6, 12, 14, 15, 16, 17, 19), trig_angles_associes (9,
// 12, 17, 19, 20), trig_grand_reel (11, 17, 19, 20), trig_parite (7, 20),
// trig_periodicite (8, 13, 19), trig_courbes (13), trig_archimede (18). 13/13.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import type { CercleTrigoPoint } from "@/lib/tutor-v4/types_canvas";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#16a34a";

/** Le cercle trigonométrique du corrigé : les points, l'arc, les projections. */
function cercle(
  points: CercleTrigoPoint[],
  opts: { reperes?: "aucun" | "quarts" | "premier_quadrant" | "tous"; valeursAxes?: boolean; titre?: string } = {},
) {
  return (
    <CanvasRenderer
      figure={{ kind: "cercle_trigo", reperes: opts.reperes ?? "tous", valeursAxes: opts.valeursAxes, titre: opts.titre, points }}
    />
  );
}

/** La courbe du cosinus sur [−0,5 ; 7], échantillonnée tous les 0,1. */
function courbeCosinus() {
  const points: { x: number; y: number }[] = [];
  for (let k = 0; k <= 66; k++) {
    const x = Math.round(k * 10) / 100;
    points.push({ x, y: Math.round(Math.cos(x) * 1000) / 1000 });
  }
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 360, height: 220 },
        xmin: -0.5,
        xmax: 7,
        ymin: -1.5,
        ymax: 1.5,
        grille: true,
        courbes: [{ id: "cos", type: "points", couleur: BLEU, points }],
      }}
    />
  );
}

export const exercicesTrigonometriePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "trigonometrie",
  titre: "La trigonométrie",
  accroche:
    "Vingt exercices, du radian au problème de contrôle, avec un rappel de cours de trois lignes avant chaque niveau. Garde un cercle trigonométrique au brouillon : presque toutes les réponses s'y lisent. Les corrections le dessinent pour toi.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Le RADIAN : $180° = \\pi$ radians. Des degrés aux radians, on multiplie par $\\dfrac{\\pi}{180}$.",
        "Sur le cercle trigonométrique (centre $O$, rayon $1$), le réel $x$ se place en parcourant depuis $I(1 ; 0)$ un arc de longueur $|x|$ : dans le sens inverse des aiguilles d'une montre si $x > 0$.",
        "Si $M$ est le point image de $x$ : $\\cos x$ est l'ABSCISSE de $M$, $\\sin x$ son ORDONNÉE.",
        "À connaître : $\\cos 0 = 1$, $\\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$, $\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$, $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$, $\\cos\\dfrac{\\pi}{2} = 0$. Pour le sinus, le même tableau dans l'ordre inverse.",
      ],
      exercices: [
        {
          enonce: "a) Convertir en radians : $30°$, $135°$, $270°$.\nb) Convertir en degrés : $\\dfrac{5\\pi}{6}$ et $\\dfrac{7\\pi}{4}$.",
          correction:
            "a) On multiplie par $\\dfrac{\\pi}{180}$, puis on simplifie la fraction.\n$30° = \\dfrac{30\\pi}{180} = \\dfrac{\\pi}{6}$.\n$135° = \\dfrac{135\\pi}{180} = \\dfrac{3\\pi}{4}$ (on divise $135$ et $180$ par $45$).\n$270° = \\dfrac{270\\pi}{180} = \\dfrac{3\\pi}{2}$.\nb) On remplace $\\pi$ par $180°$.\n$\\dfrac{5\\pi}{6} = \\dfrac{5 \\times 180°}{6} = 150°$.\n$\\dfrac{7\\pi}{4} = \\dfrac{7 \\times 180°}{4} = 315°$.\n⭐ Un repère utile : $\\dfrac{\\pi}{6} = 30°$, et tous les autres en sont des multiples ou des moitiés.",
          micros: ["trig_radian"],
        },
        {
          enonce:
            "a) Sur un cercle de rayon $1$, quelle est la longueur de l'arc intercepté par un angle de $\\dfrac{\\pi}{3}$ radian ?\nb) Une piste d'athlétisme a un virage en demi-cercle de rayon $36{,}5$ m. Quelle distance parcourt un coureur dans ce virage ? (arrondir au dixième)",
          correction:
            "Sur un cercle de rayon $r$, un angle de $\\theta$ radians intercepte un arc de longueur $r \\times \\theta$. C'est la définition même du radian.\na) $r = 1$ : l'arc mesure exactement $\\dfrac{\\pi}{3} \\approx 1{,}05$.\nb) Un demi-cercle, c'est un angle de $\\pi$ radians.\nLongueur $= 36{,}5 \\times \\pi \\approx 114{,}7$ m.\n⚠️ La formule $r \\times \\theta$ ne marche qu'avec $\\theta$ en RADIANS. Avec $180$ (degrés), on trouverait $6570$ m.",
          micros: ["trig_arc"],
        },
        {
          enonce: "Placer sur le cercle trigonométrique les points images des réels $\\dfrac{\\pi}{2}$, $-\\dfrac{\\pi}{3}$, $\\dfrac{3\\pi}{4}$ et $\\dfrac{7\\pi}{6}$.",
          figure: cercle([], { reperes: "quarts" }),
          correction:
            "On part toujours de $I(1 ; 0)$. Un demi-tour vaut $\\pi$, un quart de tour $\\dfrac{\\pi}{2}$.\n$\\dfrac{\\pi}{2}$ : un quart de tour dans le sens direct. On arrive en haut, au point $J(0 ; 1)$.\n$-\\dfrac{\\pi}{3}$ : le signe moins fait tourner dans le sens des aiguilles d'une montre, d'un tiers de demi-tour. On arrive sous l'axe, à droite.\n$\\dfrac{3\\pi}{4}$ : trois quarts de demi-tour dans le sens direct. On arrive en haut à gauche, sur la diagonale.\n$\\dfrac{7\\pi}{6} = \\pi + \\dfrac{\\pi}{6}$ : un demi-tour, puis encore $\\dfrac{\\pi}{6}$. On arrive en bas à gauche.\n⭐ Pour placer un réel, on le coupe en « demi-tours + reste ».",
          schema: cercle(
            [
              { angle: { n: 1, d: 2 }, couleur: BLEU },
              { angle: { n: -1, d: 3 }, couleur: ROUGE },
              { angle: { n: 3, d: 4 }, couleur: VERT },
              { angle: { n: 7, d: 6 }, couleur: "#9333ea" },
            ],
            { reperes: "quarts" },
          ),
          micros: ["trig_enroulement", "trig_cercle"],
        },
        {
          enonce: "Le point $M$ est le point image de $\\dfrac{\\pi}{3}$. Lire ses coordonnées sur la figure, puis donner $\\cos\\dfrac{\\pi}{3}$ et $\\sin\\dfrac{\\pi}{3}$.",
          figure: cercle([{ angle: { n: 1, d: 3 }, label: "M" }], { reperes: "quarts", valeursAxes: true }),
          correction:
            "On projette $M$ sur les deux axes.\nSur l'axe des abscisses, le pied de la projection tombe sur $\\dfrac{1}{2}$.\nSur l'axe des ordonnées, il tombe sur $\\dfrac{\\sqrt{3}}{2}$.\nDonc $M\\left(\\dfrac{1}{2} ; \\dfrac{\\sqrt{3}}{2}\\right)$, et par définition $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$, $\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.\n⭐ Le cosinus se lit à l'horizontale, le sinus à la verticale : « cos couché, sin debout ».",
          schema: cercle([{ angle: { n: 1, d: 3 }, projections: true, arc: true }], { reperes: "quarts" }),
          micros: ["trig_cos_sin"],
        },
        {
          enonce:
            "$M$ est le point image d'un réel $x$ de $\\left]0 ; \\dfrac{\\pi}{2}\\right[$, et $H$ son projeté sur l'axe des abscisses.\na) Dans le triangle $OHM$ rectangle en $H$, exprimer $\\cos x$ et $\\sin x$ avec les longueurs du triangle.\nb) En déduire $OH$ et $HM$ pour $x = \\dfrac{\\pi}{6}$.",
          correction:
            "a) Au collège : $\\cos x = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}} = \\dfrac{OH}{OM}$ et $\\sin x = \\dfrac{HM}{OM}$.\nOr $OM = 1$, puisque $M$ est sur le cercle de rayon $1$.\nDonc $\\cos x = OH$ et $\\sin x = HM$ : ce sont exactement l'abscisse et l'ordonnée de $M$.\nb) $OH = \\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2} \\approx 0{,}87$ et $HM = \\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$.\n⭐ Le cosinus du cercle PROLONGE celui du collège : pour un angle aigu, c'est le même nombre. Le cercle permet en plus de parler d'angles obtus ou négatifs.",
          schema: cercle([{ angle: { n: 1, d: 6 }, projections: true, label: "M" }], { reperes: "quarts" }),
          micros: ["trig_triangle_rectangle"],
        },
        {
          enonce: "Donner sans calculatrice : $\\cos\\dfrac{\\pi}{4}$, $\\sin\\dfrac{\\pi}{6}$, $\\cos\\dfrac{\\pi}{2}$, $\\sin\\dfrac{\\pi}{3}$ et $\\cos\\pi$.",
          correction:
            "On place chaque réel sur le cercle, puis on lit l'abscisse (cos) ou l'ordonnée (sin).\n$\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$ : le point est sur la diagonale, abscisse et ordonnée sont égales.\n$\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$ : le point est encore bas, son ordonnée est petite.\n$\\cos\\dfrac{\\pi}{2} = 0$ : le point est en haut, sur l'axe des ordonnées.\n$\\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$ : le point est déjà haut, son ordonnée est grande.\n$\\cos\\pi = -1$ : le point est tout à gauche, en $(-1 ; 0)$.\n⚠️ Pour ne pas échanger $\\dfrac{1}{2}$ et $\\dfrac{\\sqrt{3}}{2}$, regarde la figure : $\\dfrac{\\pi}{6}$ est près de l'axe horizontal, donc son sinus est le petit.",
          schema: cercle(
            [
              { angle: { n: 1, d: 6 }, projections: true, couleur: BLEU },
              { angle: { n: 1, d: 3 }, projections: true, couleur: ROUGE },
            ],
            { reperes: "premier_quadrant", valeursAxes: true },
          ),
          micros: ["trig_valeurs"],
        },
        {
          enonce: "On donne $\\cos\\dfrac{\\pi}{5} \\approx 0{,}809$ et $\\sin\\dfrac{\\pi}{5} \\approx 0{,}588$. Donner $\\cos\\left(-\\dfrac{\\pi}{5}\\right)$ et $\\sin\\left(-\\dfrac{\\pi}{5}\\right)$.",
          correction:
            "Les points images de $x$ et de $-x$ sont symétriques par rapport à l'axe des abscisses.\nIls ont la même abscisse : $\\cos(-x) = \\cos x$. Le cosinus est PAIR.\nIls ont des ordonnées opposées : $\\sin(-x) = -\\sin x$. Le sinus est IMPAIR.\nDonc $\\cos\\left(-\\dfrac{\\pi}{5}\\right) \\approx 0{,}809$ et $\\sin\\left(-\\dfrac{\\pi}{5}\\right) \\approx -0{,}588$.\n⭐ Pas besoin de connaître $\\dfrac{\\pi}{5}$ par cœur : la symétrie suffit.",
          schema: cercle(
            [
              { angle: { n: 1, d: 5 }, projections: true, couleur: BLEU },
              { angle: { n: -1, d: 5 }, projections: true, couleur: ROUGE },
            ],
            { reperes: "quarts" },
          ),
          micros: ["trig_parite"],
        },
        {
          enonce: "Calculer $\\cos\\left(2\\pi + \\dfrac{\\pi}{3}\\right)$, $\\sin\\left(\\dfrac{\\pi}{4} + 2\\pi\\right)$ et $\\cos\\left(\\dfrac{\\pi}{6} - 2\\pi\\right)$.",
          correction:
            "Ajouter ou retirer $2\\pi$, c'est faire un tour complet : on revient au même point.\nDonc $\\cos(x + 2\\pi) = \\cos x$ et $\\sin(x + 2\\pi) = \\sin x$ : cosinus et sinus sont PÉRIODIQUES de période $2\\pi$.\n$\\cos\\left(2\\pi + \\dfrac{\\pi}{3}\\right) = \\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$.\n$\\sin\\left(\\dfrac{\\pi}{4} + 2\\pi\\right) = \\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$.\n$\\cos\\left(\\dfrac{\\pi}{6} - 2\\pi\\right) = \\cos\\dfrac{\\pi}{6} = \\dfrac{\\sqrt{3}}{2}$.\n⚠️ Seul un tour COMPLET ($2\\pi$) ramène au même point. Un demi-tour ($\\pi$) mène au point opposé.",
          schema: cercle([{ angle: { n: 7, d: 3 }, projections: true, arc: true }], {
            reperes: "quarts",
            titre: "2π + π/3 : un tour, puis π/3",
          }),
          micros: ["trig_periodicite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "ANGLES ASSOCIÉS, lus sur le cercle : $\\cos(\\pi - x) = -\\cos x$ et $\\sin(\\pi - x) = \\sin x$ ; $\\cos(\\pi + x) = -\\cos x$ et $\\sin(\\pi + x) = -\\sin x$.",
        "Pour tout réel $x$ : $\\cos^2 x + \\sin^2 x = 1$ (Pythagore dans le cercle de rayon $1$).",
        "Un GRAND réel : on retire des tours complets ($2\\pi$) jusqu'à tomber dans $[0 ; 2\\pi[$, puis on lit le cercle.",
        "Un résultat se vérifie sur la figure : le SIGNE du cosinus dit si le point est à droite ou à gauche, celui du sinus s'il est en haut ou en bas.",
      ],
      exercices: [
        {
          enonce: "Calculer $\\cos\\dfrac{5\\pi}{6}$, $\\sin\\dfrac{5\\pi}{6}$, $\\cos\\dfrac{7\\pi}{6}$ et $\\sin\\left(-\\dfrac{2\\pi}{3}\\right)$.",
          correction:
            "On relie chaque réel à un réel du premier quadrant par une symétrie.\n$\\dfrac{5\\pi}{6} = \\pi - \\dfrac{\\pi}{6}$ : symétrique de $\\dfrac{\\pi}{6}$ par rapport à l'axe des ordonnées.\nDonc $\\cos\\dfrac{5\\pi}{6} = -\\cos\\dfrac{\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}$ et $\\sin\\dfrac{5\\pi}{6} = \\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}$.\n$\\dfrac{7\\pi}{6} = \\pi + \\dfrac{\\pi}{6}$ : symétrique de $\\dfrac{\\pi}{6}$ par rapport au centre $O$.\nDonc $\\cos\\dfrac{7\\pi}{6} = -\\cos\\dfrac{\\pi}{6} = -\\dfrac{\\sqrt{3}}{2}$.\n$-\\dfrac{2\\pi}{3}$ : le sinus est impair, $\\sin\\left(-\\dfrac{2\\pi}{3}\\right) = -\\sin\\dfrac{2\\pi}{3}$.\nOr $\\dfrac{2\\pi}{3} = \\pi - \\dfrac{\\pi}{3}$, donc $\\sin\\dfrac{2\\pi}{3} = \\sin\\dfrac{\\pi}{3} = \\dfrac{\\sqrt{3}}{2}$.\nFinalement $\\sin\\left(-\\dfrac{2\\pi}{3}\\right) = -\\dfrac{\\sqrt{3}}{2}$.\n✔️ Vérification des signes : $\\dfrac{5\\pi}{6}$ est en haut à gauche (cos négatif, sin positif), $-\\dfrac{2\\pi}{3}$ en bas à gauche (sin négatif).",
          schema: cercle(
            [
              { angle: { n: 1, d: 6 }, projections: true, couleur: BLEU },
              { angle: { n: 5, d: 6 }, projections: true, couleur: ROUGE },
              { angle: { n: 7, d: 6 }, projections: true, couleur: VERT },
            ],
            { reperes: "quarts" },
          ),
          micros: ["trig_angles_associes"],
        },
        {
          enonce: "On sait que $\\cos x = \\dfrac{3}{5}$ et que $x \\in [-\\pi ; 0]$. Calculer $\\sin x$.",
          correction:
            "On utilise $\\cos^2 x + \\sin^2 x = 1$.\n$\\sin^2 x = 1 - \\left(\\dfrac{3}{5}\\right)^2 = 1 - \\dfrac{9}{25} = \\dfrac{16}{25}$.\nDonc $\\sin x = \\dfrac{4}{5}$ ou $\\sin x = -\\dfrac{4}{5}$.\nComme $x \\in [-\\pi ; 0]$, le point image est sous l'axe des abscisses : son ordonnée est négative.\nDonc $\\sin x = -\\dfrac{4}{5}$.\n⛔ $1 - \\dfrac{3}{5} = \\dfrac{2}{5}$ est faux : ce sont les CARRÉS qui s'ajoutent, pas les nombres.\n⚠️ Sans l'intervalle, on ne pourrait pas choisir entre les deux valeurs.",
          schema: cercle([{ angle: { n: -2952, d: 10000 }, projections: true, arc: true, label: "M" }], { reperes: "quarts" }),
          micros: ["trig_cercle"],
        },
        {
          enonce: "Calculer $\\cos\\dfrac{31\\pi}{3}$, $\\sin\\left(-\\dfrac{17\\pi}{4}\\right)$ et $\\cos(2027\\pi)$.",
          correction:
            "On retire (ou on ajoute) des tours complets. Un tour vaut $2\\pi$.\n$\\dfrac{31\\pi}{3}$ : un tour vaut $\\dfrac{6\\pi}{3}$, et $31 = 5 \\times 6 + 1$. Donc $\\dfrac{31\\pi}{3} = \\dfrac{\\pi}{3} + 5 \\times 2\\pi$.\n$\\cos\\dfrac{31\\pi}{3} = \\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$.\n$-\\dfrac{17\\pi}{4}$ : un tour vaut $\\dfrac{8\\pi}{4}$. On AJOUTE deux tours : $-\\dfrac{17\\pi}{4} + \\dfrac{16\\pi}{4} = -\\dfrac{\\pi}{4}$.\n$\\sin\\left(-\\dfrac{17\\pi}{4}\\right) = \\sin\\left(-\\dfrac{\\pi}{4}\\right) = -\\dfrac{\\sqrt{2}}{2}$.\n$2027\\pi = \\pi + 2026\\pi = \\pi + 1013 \\times 2\\pi$ : on retire $1013$ tours.\n$\\cos(2027\\pi) = \\cos\\pi = -1$.\n⭐ Pour $k\\pi$, il suffit de savoir si $k$ est pair (on est en $I$, $\\cos = 1$) ou impair (point opposé, $\\cos = -1$).",
          schema: cercle([{ angle: { n: 31, d: 3 }, projections: true, arc: true }], {
            reperes: "quarts",
            titre: "31π/3 = π/3 + 5 tours",
          }),
          micros: ["trig_grand_reel"],
        },
        {
          enonce: "a) Trouver tous les réels $x$ de $[0 ; 2\\pi[$ tels que $\\cos x = \\dfrac{1}{2}$.\nb) Même question pour $\\sin x = -\\dfrac{\\sqrt{2}}{2}$.",
          correction:
            "a) On cherche les points du cercle d'abscisse $\\dfrac{1}{2}$ : on trace la droite verticale $x = \\dfrac{1}{2}$.\nElle coupe le cercle en DEUX points, symétriques par rapport à l'axe des abscisses.\nLe premier est l'image de $\\dfrac{\\pi}{3}$. Le second, celle de $-\\dfrac{\\pi}{3}$, soit $2\\pi - \\dfrac{\\pi}{3} = \\dfrac{5\\pi}{3}$ dans $[0 ; 2\\pi[$.\nSolutions : $x = \\dfrac{\\pi}{3}$ ou $x = \\dfrac{5\\pi}{3}$.\nb) On cherche les points d'ordonnée $-\\dfrac{\\sqrt{2}}{2}$ : la droite horizontale coupe le cercle sous l'axe, en deux points.\nCe sont les images de $\\pi + \\dfrac{\\pi}{4} = \\dfrac{5\\pi}{4}$ et de $2\\pi - \\dfrac{\\pi}{4} = \\dfrac{7\\pi}{4}$.\nSolutions : $x = \\dfrac{5\\pi}{4}$ ou $x = \\dfrac{7\\pi}{4}$.\n⛔ L'oubli classique : ne donner qu'une solution. Une droite coupe le cercle deux fois (sauf en $\\pm 1$).",
          schema: cercle(
            [
              { angle: { n: 1, d: 3 }, projections: true, couleur: BLEU },
              { angle: { n: 5, d: 3 }, projections: true, couleur: BLEU },
              { angle: { n: 5, d: 4 }, projections: true, couleur: ROUGE },
              { angle: { n: 7, d: 4 }, projections: true, couleur: ROUGE },
            ],
            { reperes: "quarts" },
          ),
          micros: ["trig_valeurs", "trig_angles_associes"],
        },
        {
          enonce:
            "Voici la courbe de la fonction cosinus.\na) Lire $\\cos 0$ et $\\cos\\pi$ (on prendra $\\pi \\approx 3{,}14$).\nb) Sur $[0 ; 2\\pi]$, pour quelles valeurs de $x$ a-t-on $\\cos x = 0$ ?\nc) La courbe se répète. Au bout de combien ? Pourquoi ?",
          figure: courbeCosinus(),
          correction:
            "a) La courbe passe par $(0 ; 1)$ : $\\cos 0 = 1$. En $x \\approx 3{,}14$, elle est à son plus bas : $\\cos\\pi = -1$.\nb) La courbe coupe l'axe des abscisses deux fois sur $[0 ; 2\\pi]$ : vers $1{,}57$ et vers $4{,}71$.\nCe sont $\\dfrac{\\pi}{2}$ et $\\dfrac{3\\pi}{2}$. Sur le cercle, ce sont les points du haut et du bas, d'abscisse nulle.\nc) Le motif recommence au bout de $2\\pi \\approx 6{,}28$.\nC'est la périodicité : $x$ et $x + 2\\pi$ ont le même point image, donc le même cosinus.\n⭐ La courbe « déroule » le cercle : quand le point fait un tour, la courbe dessine une vague complète.",
          schema: cercle(
            [
              { angle: { n: 1, d: 2 }, couleur: BLEU },
              { angle: { n: 3, d: 2 }, couleur: BLEU },
            ],
            { reperes: "quarts" },
          ),
          micros: ["trig_courbes", "trig_periodicite"],
        },
        {
          enonce:
            "Une échelle de $5$ m est posée contre un mur vertical. Elle fait avec le sol un angle de $\\dfrac{\\pi}{3}$ radian.\na) À quelle hauteur touche-t-elle le mur ? (valeur exacte, puis au centimètre)\nb) À quelle distance du mur est son pied ?",
          correction:
            "Le mur, le sol et l'échelle forment un triangle rectangle ; l'échelle en est l'hypoténuse.\na) La hauteur est le côté OPPOSÉ à l'angle : $h = 5 \\times \\sin\\dfrac{\\pi}{3} = 5 \\times \\dfrac{\\sqrt{3}}{2} = \\dfrac{5\\sqrt{3}}{2} \\approx 4{,}33$ m.\nb) La distance au mur est le côté ADJACENT : $d = 5 \\times \\cos\\dfrac{\\pi}{3} = 5 \\times \\dfrac{1}{2} = 2{,}5$ m.\n✔️ Vérification par Pythagore : $2{,}5^2 + \\left(\\dfrac{5\\sqrt{3}}{2}\\right)^2 = 6{,}25 + 18{,}75 = 25 = 5^2$.\n⭐ C'est le cercle trigonométrique agrandi 5 fois : l'échelle joue le rôle du rayon.",
          schema: cercle([{ angle: { n: 1, d: 3 }, projections: true, arc: true, label: "E" }], { reperes: "quarts" }),
          micros: ["trig_triangle_rectangle", "trig_valeurs"],
        },
        {
          enonce:
            "Démonstration (au programme). $M$ est le point image de $\\dfrac{\\pi}{4}$.\na) Expliquer pourquoi $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4}$.\nb) En utilisant $\\cos^2 x + \\sin^2 x = 1$, montrer que $\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$.",
          correction:
            "a) $\\dfrac{\\pi}{4}$, c'est la moitié du quart de tour : $M$ est sur la bissectrice des axes, la droite d'équation $y = x$.\nSon abscisse et son ordonnée sont donc égales : $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4}$. On note $c$ ce nombre.\nb) $\\cos^2\\dfrac{\\pi}{4} + \\sin^2\\dfrac{\\pi}{4} = 1$ devient $c^2 + c^2 = 1$, soit $2c^2 = 1$ et $c^2 = \\dfrac{1}{2}$.\n$M$ est dans le premier quadrant, donc $c > 0$ : $c = \\sqrt{\\dfrac{1}{2}} = \\dfrac{1}{\\sqrt{2}}$.\nOn multiplie en haut et en bas par $\\sqrt{2}$ : $c = \\dfrac{\\sqrt{2}}{2}$.\nDonc $\\cos\\dfrac{\\pi}{4} = \\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2} \\approx 0{,}71$.\n⭐ Deux idées suffisent : la symétrie (a) et Pythagore (b).",
          schema: cercle([{ angle: { n: 1, d: 4 }, projections: true, arc: true, label: "M" }], { reperes: "quarts" }),
          micros: ["trig_valeurs", "trig_cercle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent.",
      rappel: [
        "Un problème de trigonométrie se ramène presque toujours au cercle : on place le point, on lit abscisse et ordonnée.",
        "Si le réel est grand, on retire d'abord les tours ; s'il n'est pas dans le premier quadrant, on cherche le réel symétrique.",
        "Une équation $\\cos x = a$ ou $\\sin x = a$ a en général DEUX solutions sur un tour : une droite coupe le cercle en deux points.",
        "Une fonction de la forme $\\cos(\\ldots)$ se répète : elle est périodique, parce que le point fait des tours.",
      ],
      exercices: [
        {
          titre: "Démontrer cos(π/3)",
          enonce:
            "Démonstration (au programme). $M$ est le point image de $\\dfrac{\\pi}{3}$, $I$ le point $(1 ; 0)$ et $H$ le projeté de $M$ sur $(OI)$.\na) Montrer que le triangle $OIM$ est équilatéral.\nb) En déduire que $H$ est le milieu de $[OI]$, puis la valeur de $\\cos\\dfrac{\\pi}{3}$.\nc) En déduire $\\sin\\dfrac{\\pi}{3}$.",
          correction:
            "a) $OI = OM = 1$ (deux rayons) : le triangle $OIM$ est isocèle en $O$.\nSon angle en $O$ vaut $\\dfrac{\\pi}{3}$, c'est-à-dire $60°$.\nLes deux autres angles sont égaux et font ensemble $180° - 60° = 120°$ : chacun vaut $60°$.\nTrois angles de $60°$ : le triangle est équilatéral.\nb) Dans un triangle équilatéral, la hauteur issue de $M$ est aussi une médiane : elle coupe $[OI]$ en son milieu.\nDonc $OH = \\dfrac{1}{2}$, et comme $\\cos\\dfrac{\\pi}{3}$ est l'abscisse de $M$, c'est-à-dire $OH$ : $\\cos\\dfrac{\\pi}{3} = \\dfrac{1}{2}$.\nc) $\\sin^2\\dfrac{\\pi}{3} = 1 - \\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{3}{4}$.\n$M$ est au-dessus de l'axe, donc $\\sin\\dfrac{\\pi}{3} > 0$ : $\\sin\\dfrac{\\pi}{3} = \\sqrt{\\dfrac{3}{4}} = \\dfrac{\\sqrt{3}}{2}$.\n⭐ Toute la table des valeurs remarquables sort de deux figures : le triangle équilatéral (ici) et le carré coupé en deux (exercice 15).",
          schema: cercle([{ angle: { n: 1, d: 3 }, projections: true, arc: true, label: "M" }], { reperes: "quarts" }),
          micros: ["trig_valeurs", "trig_triangle_rectangle", "trig_cercle"],
        },
        {
          titre: "La grande roue",
          enonce:
            "Une grande roue a un rayon de $60$ m ; son centre est à $70$ m du sol. Une nacelle part du point le plus à droite (à $70$ m) et tourne dans le sens inverse des aiguilles d'une montre.\nQuand la roue a tourné d'un angle $x$ (en radians), la hauteur de la nacelle est $h(x) = 70 + 60\\sin x$.\na) Quelle est sa hauteur après un quart de tour ?\nb) Après avoir tourné de $\\dfrac{7\\pi}{6}$ ?\nc) Après avoir tourné de $\\dfrac{13\\pi}{6}$ ?\nd) Pour quels angles $x$ de $[0 ; 2\\pi[$ la nacelle est-elle à $100$ m ?",
          correction:
            "a) Un quart de tour, c'est $x = \\dfrac{\\pi}{2}$ : $h = 70 + 60 \\times \\sin\\dfrac{\\pi}{2} = 70 + 60 \\times 1 = 130$ m. C'est le sommet.\nb) $\\dfrac{7\\pi}{6} = \\pi + \\dfrac{\\pi}{6}$ : $\\sin\\dfrac{7\\pi}{6} = -\\sin\\dfrac{\\pi}{6} = -\\dfrac{1}{2}$.\n$h = 70 + 60 \\times \\left(-\\dfrac{1}{2}\\right) = 70 - 30 = 40$ m.\nc) $\\dfrac{13\\pi}{6} = \\dfrac{\\pi}{6} + 2\\pi$ : la roue a fait un tour complet, puis $\\dfrac{\\pi}{6}$.\n$h = 70 + 60 \\times \\sin\\dfrac{\\pi}{6} = 70 + 30 = 100$ m.\nd) $70 + 60\\sin x = 100$ donne $60\\sin x = 30$, soit $\\sin x = \\dfrac{1}{2}$.\nSur le cercle, deux points ont pour ordonnée $\\dfrac{1}{2}$ : les images de $\\dfrac{\\pi}{6}$ et de $\\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}$.\nLa nacelle est à $100$ m pour $x = \\dfrac{\\pi}{6}$ (en montant) et pour $x = \\dfrac{5\\pi}{6}$ (en redescendant).\n⭐ La roue EST un cercle trigonométrique, agrandi 60 fois et posé à 70 m du sol.",
          schema: cercle(
            [
              { angle: { n: 1, d: 6 }, projections: true, couleur: BLEU },
              { angle: { n: 5, d: 6 }, projections: true, couleur: BLEU },
              { angle: { n: 7, d: 6 }, projections: true, couleur: ROUGE },
            ],
            { reperes: "quarts" },
          ),
          micros: ["trig_enroulement", "trig_grand_reel", "trig_valeurs", "trig_angles_associes"],
        },
        {
          titre: "Approcher π comme Archimède",
          enonce:
            "On inscrit des polygones réguliers dans un cercle de rayon $1$.\na) Un hexagone régulier inscrit a des côtés de longueur $1$. En déduire que $3 < \\pi$.\nb) $[AB]$ est un côté d'un polygone régulier à $n$ côtés. Montrer que $AB = 2\\sin\\dfrac{\\pi}{n}$. (Couper le triangle $OAB$ par sa hauteur issue de $O$.)\nc) Calculer le demi-périmètre $n\\sin\\dfrac{\\pi}{n}$ pour $n = 12$, à $10^{-4}$ près.\nd) Archimède est allé jusqu'à $n = 96$. Avec aussi les polygones circonscrits ($n\\tan\\dfrac{\\pi}{n}$), il obtient l'encadrement ci-dessous. Combien de décimales de $\\pi$ garantit-il ?\n$3{,}1410 < 96\\sin\\dfrac{\\pi}{96} < \\pi < 96\\tan\\dfrac{\\pi}{96} < 3{,}1428$",
          correction:
            "a) Le périmètre de l'hexagone vaut $6$, son demi-périmètre $3$.\nChaque côté est un segment, plus court que l'arc de cercle qu'il joint. Donc le demi-périmètre de l'hexagone est plus petit que celui du cercle, qui vaut $\\pi$ : $3 < \\pi$.\nb) Le triangle $OAB$ est isocèle en $O$ ($OA = OB = 1$). Son angle en $O$ vaut $\\dfrac{2\\pi}{n}$, car les $n$ angles au centre font un tour.\nLa hauteur issue de $O$ coupe $[AB]$ en son milieu $K$ et l'angle en deux : $\\widehat{AOK} = \\dfrac{\\pi}{n}$.\nDans le triangle $OAK$ rectangle en $K$, d'hypoténuse $OA = 1$ : $AK = \\sin\\dfrac{\\pi}{n}$.\nDonc $AB = 2\\,AK = 2\\sin\\dfrac{\\pi}{n}$.\nc) Pour $n = 12$ : $12\\sin\\dfrac{\\pi}{12} \\approx 12 \\times 0{,}258819 \\approx 3{,}1058$. (Calculatrice en mode RADIAN.)\nd) Les deux bornes commencent par $3{,}14$, puis diffèrent ($3{,}1410$ et $3{,}1428$). L'encadrement garantit deux décimales : $\\pi \\approx 3{,}14$.\n⭐ Plus $n$ est grand, plus le polygone colle au cercle : c'est l'idée d'une limite, 2 200 ans avant qu'on la nomme.",
          micros: ["trig_archimede", "trig_triangle_rectangle"],
        },
        {
          titre: "La marée",
          enonce:
            "Dans un port de Bretagne, on modélise la hauteur d'eau (en mètres) par $h(t) = 5 + 3\\cos\\dfrac{\\pi t}{6}$, où $t$ est le temps en heures depuis la marée haute.\na) Calculer $h(0)$, $h(6)$ et $h(12)$. Interpréter.\nb) Montrer que $h(t + 12) = h(t)$. Que signifie ce résultat ?\nc) Calculer $h(2)$ et $h(8)$.\nd) Quelle est la hauteur d'eau au bout de $30$ heures ?",
          correction:
            "a) $h(0) = 5 + 3\\cos 0 = 5 + 3 = 8$ m : c'est la marée haute.\n$h(6) = 5 + 3\\cos\\pi = 5 - 3 = 2$ m : la marée basse, six heures plus tard.\n$h(12) = 5 + 3\\cos(2\\pi) = 8$ m : de nouveau la marée haute.\nb) $h(t + 12) = 5 + 3\\cos\\dfrac{\\pi(t + 12)}{6} = 5 + 3\\cos\\left(\\dfrac{\\pi t}{6} + 2\\pi\\right)$.\nAjouter $2\\pi$ ne change pas le cosinus : $h(t + 12) = 5 + 3\\cos\\dfrac{\\pi t}{6} = h(t)$.\nLa hauteur d'eau se répète toutes les $12$ heures : $h$ est périodique de période $12$.\nc) $h(2) = 5 + 3\\cos\\dfrac{\\pi}{3} = 5 + 3 \\times \\dfrac{1}{2} = 6{,}5$ m.\n$h(8) = 5 + 3\\cos\\dfrac{4\\pi}{3}$. Or $\\dfrac{4\\pi}{3} = \\pi + \\dfrac{\\pi}{3}$, donc $\\cos\\dfrac{4\\pi}{3} = -\\dfrac{1}{2}$ et $h(8) = 5 - 1{,}5 = 3{,}5$ m.\nd) $h(30) = 5 + 3\\cos(5\\pi)$. $5\\pi = \\pi + 2 \\times 2\\pi$ : $\\cos(5\\pi) = \\cos\\pi = -1$.\n$h(30) = 2$ m : c'est une marée basse.\n⚠️ Un modèle simplifié : la vraie période d'une marée est d'environ $12$ h $25$ min.",
          schema: cercle(
            [
              { angle: { n: 1, d: 3 }, projections: true, couleur: BLEU },
              { angle: { n: 4, d: 3 }, projections: true, couleur: ROUGE },
            ],
            { reperes: "quarts" },
          ),
          micros: ["trig_periodicite", "trig_grand_reel", "trig_valeurs", "trig_angles_associes"],
        },
        {
          titre: "Le réel de l'année",
          enonce:
            "Soit $x = \\dfrac{2026\\pi}{6}$.\na) Écrire $x$ sous la forme $a + k \\times 2\\pi$, avec $a \\in [0 ; 2\\pi[$ et $k$ entier.\nb) Dans quel quadrant se trouve le point image de $x$ ?\nc) Calculer $\\cos x$ et $\\sin x$.\nd) En déduire $\\cos(x + \\pi)$ et $\\sin(-x)$.",
          correction:
            "a) On simplifie d'abord : $\\dfrac{2026\\pi}{6} = \\dfrac{1013\\pi}{3}$.\nUn tour vaut $2\\pi = \\dfrac{6\\pi}{3}$. On divise $1013$ par $6$ : $1013 = 6 \\times 168 + 5$.\nDonc $x = \\dfrac{5\\pi}{3} + 168 \\times 2\\pi$, avec $a = \\dfrac{5\\pi}{3}$ et $k = 168$.\nb) $\\dfrac{5\\pi}{3} = 2\\pi - \\dfrac{\\pi}{3}$ : le point image est le symétrique de celui de $\\dfrac{\\pi}{3}$ par rapport à l'axe des abscisses. Il est dans le quatrième quadrant (en bas à droite).\nc) Même abscisse que $\\dfrac{\\pi}{3}$, ordonnée opposée : $\\cos x = \\dfrac{1}{2}$ et $\\sin x = -\\dfrac{\\sqrt{3}}{2}$.\nd) $x + \\pi$ mène au point diamétralement opposé : $\\cos(x + \\pi) = -\\cos x = -\\dfrac{1}{2}$.\nLe sinus est impair : $\\sin(-x) = -\\sin x = \\dfrac{\\sqrt{3}}{2}$.\n✔️ Signes : bas à droite, cosinus positif et sinus négatif. C'est cohérent.",
          schema: cercle([{ angle: { n: 2026, d: 6 }, projections: true, arc: true }], {
            reperes: "quarts",
            titre: "2026π/6 = 5π/3 + 168 tours",
          }),
          micros: ["trig_grand_reel", "trig_angles_associes", "trig_parite"],
        },
      ],
    },
  ],
};
