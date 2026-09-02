// ─── Fiche de cours : se repérer sur une droite, dans le plan, sur la Terre ────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/reperage.bank.ts, notionId reperage).
//
// ⭐ NOTION OUVERTE LE 31/08/2026, avec sa sœur `vision_espace` : les deux
// ferment le DERNIER bloc du programme de 4e, « Représenter l'espace ».
//
// ⭐ TROIS MICROS REPRENNENT LEURS IDENTIFIANTS DE LA 6e (`abscisse_lire`,
// `abscisse_placer`, `abscisse_fraction`). La progression se lit en entier :
//   CP → CM2  se repérer sur un quadrillage, puis sur une demi-droite
//   6e        lire et placer une abscisse, y compris fractionnaire
//   4e        + le plan muni d'un repère, le pavé droit, la sphère
//
// ⚠️⚠️ LE PRÉALABLE A ÉTÉ LEVÉ LE 30/08/2026. Deux gabarits de translation de
// cette classe comptaient l'ordonnée VERS LE BAS (« ordonnée écran »), si bien
// que la réponse mathématiquement juste y était proposée comme LEURRE. Ouvrir
// le repérage par-dessus aurait figé l'erreur. ⭐ DANS UN REPÈRE, L'AXE DES
// ORDONNÉES MONTE — et cette fiche le dit explicitement, parce qu'un élève a pu
// apprendre le contraire ici même.
//
// ⛔ L'ORDRE DES COORDONNÉES EST LA DIFFICULTÉ CENTRALE : on lit TOUJOURS
// l'abscisse d'abord. (3 ; 5) n'est pas (5 ; 3). Cette erreur a son bloc à
// elle, pas seulement une phrase — et le dessin montre les DEUX points.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE :
//   abscisse_lire     → lire une abscisse, et la distance entre deux points
//   abscisse_placer   → où placer, et lequel est le plus à droite
//   abscisse_fraction → l'unité découpée en parts, et l'encadrement
//   repere_plan       → lire, l'ordre, et le sens des axes
//   repere_espace     → les sommets du pavé, et combien de nombres il faut
//   repere_terre      → latitude, longitude, hémisphère
//   repere_defi       → symétriques, milieu, quel support
//
// ⚠️ MESURES DE CANVAS. `number_line` est plafonné à 320 px et son viewBox vaut
// son champ `size` : posé à 222 dans une carte de propriété, l'échelle vaut 1
// et les libellés sortent à 14 px. Idem pour `reperage`, plafonné à 360.
// ⛔ `repere3d` N'EST PAS UTILISÉ ICI : ses libellés sont écrits en 13, et son
// dessin part d'une origine calculée sur la largeur — dans une carte de 222 px
// il devient illisible. Le pavé se raconte donc en tableau, qui se rend en
// cellules HTML et suit son bloc sans jamais rétrécir.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX. Les
 * libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple — ils sont
 * tracés en <text> SVG, où le LaTeX s'afficherait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px : 222 px pour
// une carte de propriété, 216 px pour « La formule », 200 px pour un exemple.
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
 * La droite graduée, à l'échelle 1.
 * ⚠️ `number_line` CENTRE ses étiquettes sur leur valeur : un point posé sur le
 * minimum ou le maximum déborderait de la moitié de sa largeur. On garde donc
 * une graduation de marge à chaque bout.
 */
const droite = (
  min: number,
  max: number,
  step: number,
  points: { value: number; label?: string; color?: string }[],
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      // ⚠️ LE PAS DEMANDÉ EST UN MINIMUM, PAS UNE CONSIGNE (corrigé le 02/09).
      // Deux appels traçaient `-10..10` au pas de 2, soit ONZE graduations : à
      // 222 px de large, « -10 » et « -8 » se touchaient. La règle du 24/08 est
      // de viser SEPT graduations au plus, et la fiche pilote de 5e la fait
      // respecter par un pas adaptatif — (étendue ÷ 6). On la met ici DANS le
      // helper, et non à chaque appel : un garde-fou qu'on peut oublier d'écrire
      // ne garde rien. Les POINTS, eux, restent posés à leur valeur exacte.
      step: Math.max(step, Math.ceil((max - min) / 6)),
      points,
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: bloc === "exemple" ? 200 : 222, height: 130 },
    }}
  />
);

/** Le plan quadrillé, à l'échelle 1 dans son bloc. */
const plan = (
  points: { x: number; y: number; label?: string; color?: string }[],
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={{
      kind: "reperage",
      grid: { rows: 7, cols: 7 },
      points,
      // ⚠️ PLUS HAUT QUE LARGE, ET C'EST MESURÉ (02/09). Sept lignes empilées
      // dans 210 px laissaient 20 unités par case : sur un téléphone, les
      // graduations « 0 », « 1 », « 2 » de l'axe vertical se touchaient, et une
      // étiquette de point sortait du cadre. La LARGEUR, elle, est imposée par le
      // bloc — 222 px pour une carte, 200 pour un exemple — mais la hauteur est
      // libre : on la donne. Un repère carré n'a rien d'obligatoire, et un
      // quadrillage lisible vaut mieux qu'un quadrillage carré.
      size: { width: bloc === "exemple" ? 200 : 222, height: bloc === "exemple" ? 230 : 255 },
    }}
  />
);

export const ficheReperage4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "reperage",
  titre: "Se repérer sur une droite, dans le plan, sur la Terre",
  accroche:
    "Un point sur une droite demande un nombre. Un point sur une feuille en demande deux. Un point dans une pièce en demande trois. Se repérer, c'est toujours la même idée — donner assez de nombres pour qu'il n'y ait plus d'ambiguïté — et le nombre qu'il en faut dit à lui seul dans quel monde on travaille.",
  identite: [
    { label: "La règle d'or", valeur: "L'ABSCISSE d'abord, toujours : (3 ; 5) n'est pas (5 ; 3)" },
    { label: "Combien de nombres", valeur: "Une droite : 1 · un plan : 2 · l'espace : 3 · la Terre : 2" },
    { label: "Le piège", valeur: "Dans un repère l'axe des ordonnées MONTE — pas comme sur un écran" },
  ],
  definition: {
    texte:
      "Repérer un point, c'est lui associer des nombres qui le désignent sans ambiguïté. Sur une droite graduée, ce nombre unique s'appelle l'ABSCISSE. Dans le plan, il en faut deux : l'abscisse, qu'on lit sur l'axe horizontal, et l'ORDONNÉE, qu'on lit sur l'axe vertical. ⚠️ Le nombre de coordonnées nécessaires n'est pas celui du monde autour, mais celui du SUPPORT : la surface de la Terre est dans l'espace, et pourtant deux nombres y suffisent — on ne peut pas la quitter.",
  },
  figure: {
    schema: legende(
      droite(-12, 12, 3, [
        { value: -6, label: "A", color: "#2563eb" },
        { value: 6, label: "B", color: "#2563eb" },
      ]),
      "l'abscisse de A vaut $-6$, celle de B vaut $6$",
    ),
    legende:
      "Une abscisse n'est pas une distance : elle porte un SIGNE. À gauche de l'origine elle est négative, à droite positive. La distance entre A et B, elle, vaut 12 — un nombre toujours positif, qu'on obtienne en faisant 6 − (−6).",
  },
  proprietes: [
    {
      titre: "Une abscisse a un signe, une distance n'en a pas",
      micros: ["abscisse_lire"],
      texte:
        "L'abscisse d'un point situé à gauche de l'origine est NÉGATIVE. C'est ce qui la distingue d'une distance, toujours positive. Pour trouver la distance entre deux points, on soustrait la plus petite abscisse à la plus grande. ⚠️ Soustraire un nombre négatif revient à l'ajouter : c'est là que le calcul dérape.",
      schema: legende(
        droite(-10, 10, 2, [
          { value: -4, label: "M", color: "#2563eb" },
          { value: 6, label: "R", color: "#ef4444" },
        ]),
        "distance $= 6 - (-4) = 10$",
      ),
    },
    {
      titre: "Le signe dit le côté, le pas dit combien",
      micros: ["abscisse_placer"],
      texte:
        "Pour placer un point d'abscisse donnée, deux informations suffisent : le SIGNE indique de quel côté de l'origine, et le nombre divisé par le PAS indique combien de graduations. ⚠️ Quand le pas ne vaut pas 1, compter le nombre lui-même au lieu de le diviser est l'erreur classique — sur une droite de pas 5, le point d'abscisse 15 est à 3 graduations, pas à 15.",
      schema: tableau({
        headers: ["abscisse", "pas", "graduations"],
        rows: [
          { values: ["15", "5", "3 à droite"] },
          { values: ["−8", "2", "4 à gauche"] },
          { values: ["0", "n'importe", "sur l'origine"] },
        ],
        highlight: { col: 2 },
        caption: "on divise toujours par le pas",
      }),
    },
    {
      titre: "Une fraction se place aussi",
      micros: ["abscisse_fraction"],
      texte:
        "Quand chaque unité est découpée en parts égales, le DÉNOMINATEUR est le nombre de parts par unité, et le NUMÉRATEUR le nombre de parts comptées depuis l'origine. ⚠️ Retourner la fraction est le piège le plus fréquent : le dénominateur compte les parts d'UNE UNITÉ, jamais les parts comptées.",
      schema: legende(
        droite(-1, 3, 1, [{ value: 2, label: "7/4 ≈ 1,75", color: "#7c3aed" }]),
        "$\\dfrac{7}{4}$ est entre $1$ et $2$ : $7 \\div 4 = 1$ reste $3$",
      ),
    },
    {
      titre: "L'abscisse d'abord, toujours",
      micros: ["repere_plan"],
      texte:
        "Les coordonnées s'écrivent (abscisse ; ordonnée). On descend du point jusqu'à l'axe horizontal pour lire la première, on va jusqu'à l'axe vertical pour lire la seconde. ⚠️ (3 ; 5) et (5 ; 3) ne désignent PAS le même point — l'ordre n'est pas une convention d'écriture, il change le point.",
      schema: legende(
        plan([
          { x: 3, y: 5, label: "(3 ; 5)", color: "#2563eb" },
          { x: 5, y: 3, label: "(5 ; 3)", color: "#ef4444" },
        ]),
        "deux points différents, symétriques par rapport à la diagonale",
      ),
    },
    {
      titre: "Dans un repère, l'axe des ordonnées MONTE",
      micros: ["repere_plan"],
      texte:
        "Aller vers le haut AJOUTE à l'ordonnée ; aller vers le bas en RETIRE. Un déplacement vertical ne touche pas l'abscisse. ⚠️⚠️ C'est l'INVERSE sur un écran d'ordinateur, où l'origine est en haut à gauche et où descendre augmente la coordonnée. Un repère de mathématiques n'est pas un écran.",
      schema: tableau({
        headers: ["on va vers", "l'ordonnée"],
        rows: [
          { values: ["le haut", "AUGMENTE"] },
          { values: ["le bas", "DIMINUE"] },
          { values: ["(sur un écran)", "l'inverse"] },
        ],
        highlight: { row: 2 },
        caption: "un repère n'est pas un écran",
      }),
    },
    {
      titre: "Dans l'espace, il en faut trois",
      micros: ["repere_espace"],
      texte:
        "Un sommet de pavé se désigne par (abscisse ; profondeur ; altitude) — la même règle que dans le plan, avec un nombre de plus. ⭐ Compter les zéros dit tout de suite où l'on est : un sommet posé sur un axe a DEUX coordonnées nulles, un sommet sur une face en a UNE, et l'origine les a toutes les trois.",
      schema: tableau({
        headers: ["combien de zéros", "où est le point"],
        rows: [
          { values: ["3", "à l'origine"] },
          { values: ["2", "sur un axe"] },
          { values: ["1", "sur une face"] },
          { values: ["0", "au sommet opposé"] },
        ],
        highlight: { row: 3 },
        caption: "les zéros disent la position",
      }),
    },
    {
      titre: "Sur la Terre : latitude et longitude",
      micros: ["repere_terre"],
      texte:
        "La LATITUDE mesure l'écart à l'équateur, vers le nord ou vers le sud ; la LONGITUDE mesure l'écart au méridien de Greenwich, vers l'est ou vers l'ouest. ⭐ Un moyen sûr de ne pas les confondre : la latitude ne dépasse jamais 90°, puisque le pôle est le maximum. La longitude, elle, monte jusqu'à 180°.",
      schema: tableau({
        headers: ["ville", "latitude", "longitude"],
        rows: [
          { values: ["Saint-Denis", "20° S", "55° E"] },
          { values: ["Paris", "48° N", "2° E"] },
          { values: ["Quito", "0°", "78° O"] },
        ],
        highlight: { col: 1 },
        caption: "la latitude donne l'hémisphère",
      }),
    },
  ],
  reel: {
    texte:
      "Un téléphone qui affiche sa position donne deux nombres : latitude et longitude. Un avion en donne trois, parce qu'il peut quitter la surface — et c'est exactement pour cela que le contrôle aérien parle de niveaux de vol. La différence entre deux et trois coordonnées n'est donc pas une subtilité scolaire : c'est la différence entre un bateau et un avion. À La Réunion, la position de l'île — 21° de latitude sud, 55° de longitude est — explique bien plus qu'un point sur une carte : c'est sa latitude sud qui met l'hiver en juillet, et sa longitude est qui la place trois heures avant Paris en été. Les secours en mer, eux, travaillent au dixième de minute d'angle : à cette latitude, une minute vaut environ 1,8 km, et un dixième environ 180 mètres. Se tromper d'un chiffre après la virgule déplace la zone de recherche de la taille d'un stade.",
  },
  historique: {
    texte:
      "L'idée de repérer un point par des nombres est étonnamment récente en mathématiques, alors qu'elle est très ancienne en géographie : Hipparque, au IIe siècle avant notre ère, propose déjà de situer les villes par latitude et longitude, et Ptolémée en dresse des tables. Mais il faut attendre 1637 et La Géométrie de Descartes pour que ce procédé entre dans les mathématiques elles-mêmes — d'où le nom de repère cartésien. Ce que Descartes apporte n'est pas le quadrillage : c'est l'idée qu'une COURBE peut s'écrire comme une équation entre deux coordonnées, et donc que la géométrie et le calcul sont deux langues pour dire la même chose. La longitude, elle, est restée un problème pratique pendant encore un siècle : la mesurer en mer supposait de connaître l'heure du port de départ, ce qu'aucune horloge ne tenait sur un bateau. Le Parlement britannique offrit une récompense considérable, remportée en 1765 par un horloger, John Harrison, et non par un astronome.",
  },
  formule: {
    contexte: "Pour désigner un point sans ambiguïté",
    expression: "droite : $(x)$   ·   plan : $(x\\,;\\,y)$   ·   espace : $(x\\,;\\,y\\,;\\,z)$",
    legende:
      "Le nombre de coordonnées est la DIMENSION du support. Il ne dépend pas de l'objet ni du monde autour : la surface de la Terre demande deux nombres bien qu'elle soit dans l'espace, parce qu'on ne peut pas la quitter.",
    schema: tableau(
      {
        headers: ["support", "combien"],
        rows: [
          { values: ["une droite graduée", "1"] },
          { values: ["une feuille", "2"] },
          { values: ["la surface de la Terre", "2"] },
          { values: ["une pièce, le ciel", "3"] },
        ],
        highlight: { row: 2 },
        caption: "la Terre : 2, malgré l'espace",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Lire une abscisse",
      micros: ["abscisse_lire"],
      texte:
        "On repère l'origine, on regarde de quel côté se trouve le point — cela donne le signe — puis on compte les graduations et on multiplie par le pas.",
      schema: legende(
        droite(-15, 15, 5, [{ value: -10, label: "S", color: "#7c3aed" }]),
        "2 graduations à gauche, pas de 5 : abscisse $-10$",
      ),
    },
    {
      titre: "Encadrer une fraction entre deux entiers",
      micros: ["abscisse_fraction"],
      texte:
        "On fait la division euclidienne du numérateur par le dénominateur. Le QUOTIENT donne l'entier de gauche, et le RESTE dit combien de parts après lui. ⭐ C'est l'endroit du programme où la division euclidienne devient visible.",
      schema: tableau({
        headers: ["fraction", "division", "entre"],
        rows: [
          { values: ["7/4", "7 = 4×1 + 3", "1 et 2"] },
          { values: ["17/5", "17 = 5×3 + 2", "3 et 4"] },
        ],
        highlight: { col: 2 },
        caption: "le quotient donne l'entier de gauche",
      }),
    },
    {
      titre: "Lire des coordonnées dans le plan",
      micros: ["repere_plan"],
      texte:
        "On projette le point sur l'axe horizontal pour l'abscisse, puis sur l'axe vertical pour l'ordonnée. On écrit dans cet ordre, séparés par un point-virgule. ⚠️ Avant d'écrire, on vérifie le sens des axes : dans un repère, la droite et le haut sont positifs.",
      schema: legende(
        plan([{ x: 4, y: 2, label: "(4 ; 2)", color: "#2563eb" }]),
        "4 vers la droite, 2 vers le haut",
      ),
    },
    {
      titre: "Trouver un symétrique",
      micros: ["repere_defi"],
      texte:
        "Une symétrie par rapport à un axe garde la coordonnée le long de cet axe et change l'autre de signe. La symétrie par rapport à l'ORIGINE est un demi-tour : c'est la seule des trois qui change les DEUX coordonnées.",
      schema: tableau({
        headers: ["symétrie par rapport à", "(x ; y) devient"],
        rows: [
          { values: ["l'axe des abscisses", "(x ; −y)"] },
          { values: ["l'axe des ordonnées", "(−x ; y)"] },
          { values: ["l'origine", "(−x ; −y)"] },
        ],
        highlight: { row: 2 },
        caption: "l'origine change les deux",
      }),
    },
    {
      titre: "Calculer un milieu",
      micros: ["repere_defi"],
      texte:
        "On fait la moyenne des abscisses, puis la moyenne des ordonnées — séparément. ⚠️ Faire une moyenne des quatre nombres d'un coup n'a aucun sens : abscisses avec abscisses, ordonnées avec ordonnées.",
      schema: legende(
        plan([
          { x: 1, y: 1, label: "A", color: "#2563eb" },
          { x: 5, y: 5, label: "B", color: "#2563eb" },
          { x: 3, y: 3, label: "milieu", color: "#7c3aed" },
        ]),
        "$(1+5) \\div 2 = 3$ et $(1+5) \\div 2 = 3$",
      ),
    },
  ],
  usages: [
    {
      titre: "On me donne un point sur une droite",
      micros: ["abscisse_lire", "abscisse_placer"],
      detail:
        "Je compte les graduations depuis l'origine, je multiplie par le pas, et je mets le signe selon le côté.",
    },
    {
      titre: "On me demande une distance",
      micros: ["abscisse_lire"],
      detail:
        "Je soustrais la plus petite abscisse à la plus grande. Le résultat est toujours positif.",
    },
    {
      titre: "On me donne un point dans un repère",
      micros: ["repere_plan"],
      detail:
        "Je lis l'abscisse d'abord, l'ordonnée ensuite. Et je vérifie que l'axe vertical monte.",
    },
    {
      titre: "On me parle d'un lieu sur Terre",
      micros: ["repere_terre"],
      detail:
        "Latitude puis longitude. La latitude ne dépasse jamais 90° et donne l'hémisphère.",
    },
  ],
  exemples: [
    {
      titre: "Deux points, une distance",
      micros: ["abscisse_lire"],
      donnees: "Sur une droite graduée, le point M a pour abscisse −4 et le point R pour abscisse 6.",
      question: "Quelle est la distance entre M et R ?",
      schema: legende(
        droite(-10, 10, 2, [
          { value: -4, label: "M", color: "#2563eb" },
          { value: 6, label: "R", color: "#ef4444" },
        ], "exemple"),
        "de $-4$ à $6$",
      ),
      solution:
        "On soustrait la plus petite abscisse à la plus grande : $6 - (-4)$.\n\nSoustraire $-4$ revient à AJOUTER 4 : $6 + 4 = 10$. La distance vaut 10.\n\n⚠️ Deux erreurs guettent ici. La première est de faire $6 - 4 = 2$ en oubliant le signe. La seconde est d'écrire $-4 - 6 = -10$ : le calcul est juste, mais ce n'est pas une distance — une distance ne peut pas être négative.\n\n⭐ Le contrôle est immédiat : on compte les graduations sur le dessin. De −4 à 0, il y a 4 ; de 0 à 6, il y a 6. Total : 10.",
    },
    {
      titre: "L'ordre change le point",
      micros: ["repere_plan"],
      donnees: "On considère les points de coordonnées (2 ; 6) et (6 ; 2).",
      question: "Sont-ils au même endroit ?",
      schema: legende(
        plan([
          { x: 2, y: 6, label: "(2 ; 6)", color: "#2563eb" },
          { x: 6, y: 2, label: "(6 ; 2)", color: "#ef4444" },
        ], "exemple"),
        "deux points, pas un",
      ),
      solution:
        "Non. Le premier est à 2 vers la droite et 6 vers le haut ; le second est à 6 vers la droite et 2 vers le haut.\n\nCe sont deux points différents, symétriques par rapport à la diagonale du repère.\n\n⭐ Ils ne se confondraient que si les deux coordonnées étaient ÉGALES — c'est-à-dire si le point était sur cette diagonale. (4 ; 4) est le seul cas où l'échange ne change rien.\n\n⚠️ C'est pour cela qu'on écrit toujours l'abscisse en premier : sans cette règle, une coordonnée ne désignerait rien.",
    },
    {
      titre: "Combien de nombres pour un avion ?",
      micros: ["repere_espace", "repere_terre", "repere_defi"],
      donnees: "Un bateau et un avion signalent leur position.",
      question: "Combien de nombres faut-il à chacun ?",
      schema: tableau(
        {
          headers: ["", "combien"],
          rows: [
            { values: ["un bateau", "2"] },
            { values: ["un avion", "3"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "Le bateau ne peut pas quitter la surface de la mer : deux nombres suffisent, la latitude et la longitude.\n\nL'avion, lui, peut monter : il faut un troisième nombre, l'altitude.\n\n⭐ La leçon est générale et vaut bien au-delà de cet exemple : le nombre de coordonnées est la DIMENSION DU SUPPORT, pas celle du monde autour. La surface de la Terre est bien dans l'espace, et pourtant deux nombres y suffisent — parce qu'on ne peut pas s'en écarter.\n\nC'est la même différence qu'entre une feuille et une salle de classe.",
    },
  ],
  pieges: [
    "Confondre une abscisse et une distance. L'abscisse porte un signe, la distance non.",
    "Oublier de diviser par le pas. Sur une droite de pas 5, l'abscisse 15 est à 3 graduations.",
    "Retourner une fraction. Le dénominateur compte les parts d'une unité, pas les parts comptées.",
    "Écrire l'ordonnée en premier. (3 ; 5) n'est pas (5 ; 3).",
    "Croire que monter diminue l'ordonnée. C'est vrai sur un écran d'ordinateur, jamais dans un repère.",
    "Oublier une coordonnée dans l'espace. Un point d'un pavé en demande trois, pas deux.",
    "Confondre latitude et longitude. La latitude ne dépasse jamais 90° et donne l'hémisphère.",
    "Faire la moyenne des quatre nombres pour un milieu. Abscisses avec abscisses, ordonnées avec ordonnées.",
  ],
  aRetenir: [
    "Repérer un point, c'est lui associer assez de nombres pour qu'il n'y ait plus d'ambiguïté.",
    "Sur une droite : une abscisse, qui porte un SIGNE. Une distance, elle, est toujours positive.",
    "Dans le plan : (abscisse ; ordonnée), et l'ABSCISSE D'ABORD, toujours.",
    "Dans un repère, l'axe des ordonnées MONTE — l'inverse d'un écran d'ordinateur.",
    "Dans l'espace : trois coordonnées. Compter les zéros dit où se trouve le point.",
    "Sur la Terre : latitude et longitude. La latitude ne dépasse jamais 90° et donne l'hémisphère.",
    "Le nombre de coordonnées est la dimension du SUPPORT, pas celle du monde autour.",
    "Milieu d'un segment : moyenne des abscisses, puis moyenne des ordonnées, séparément.",
  ],
  entrainement: [
    {
      micros: ["abscisse_lire"],
      question: "Sur une droite graduée de pas 5, un point est à 3 graduations à gauche de l'origine. Quelle est son abscisse ?",
      correction: "$-15$. Trois graduations de 5, à gauche donc négatif.",
    },
    {
      micros: ["abscisse_lire"],
      question: "Deux points ont pour abscisses −7 et 5. Quelle est la distance entre eux ?",
      correction: "$5 - (-7) = 5 + 7 = 12$. Soustraire un négatif revient à l'ajouter.",
    },
    {
      micros: ["abscisse_placer"],
      question: "Sur une droite de pas 2, où placer le point d'abscisse −8 ?",
      correction: "À 4 graduations à gauche de l'origine, car $8 \\div 2 = 4$.",
    },
    {
      micros: ["abscisse_placer"],
      question: "Entre les abscisses −3 et −9, laquelle correspond au point le plus à droite ?",
      correction:
        "$-3$, car $-3 > -9$. ⚠️ Le piège : $-9$ est plus LOIN de zéro, mais il est plus PETIT.",
    },
    {
      micros: ["abscisse_fraction"],
      question: "Chaque unité est découpée en 5 parts. Un point est à 8 parts à droite de l'origine. Quelle est son abscisse ?",
      correction: "$\\dfrac{8}{5}$. Le dénominateur est le nombre de parts par unité.",
    },
    {
      micros: ["abscisse_fraction"],
      question: "Entre quels deux entiers se place $\\dfrac{17}{5}$ ?",
      correction: "$17 = 5 \\times 3 + 2$, donc entre 3 et 4, à 2 parts après 3.",
    },
    {
      micros: ["repere_plan"],
      question: "Un point est à 5 vers la droite et 2 vers le haut. Quelles sont ses coordonnées ?",
      correction: "$(5 ; 2)$. L'abscisse d'abord.",
    },
    {
      micros: ["repere_plan"],
      question: "Le point (4 ; 3) est déplacé de 2 carreaux vers le haut. Quelles sont ses nouvelles coordonnées ?",
      correction:
        "$(4 ; 5)$. Monter AJOUTE à l'ordonnée, et l'abscisse ne change pas. ⚠️ (4 ; 1) serait la réponse sur un écran d'ordinateur, pas dans un repère.",
    },
    {
      micros: ["repere_espace"],
      question: "Un pavé droit a un sommet à l'origine et mesure 4, 3 et 2. Quelles sont les coordonnées du sommet opposé ?",
      correction: "$(4 ; 3 ; 2)$ — aucune coordonnée nulle, c'est le sommet le plus éloigné.",
    },
    {
      micros: ["repere_terre"],
      question: "Une ville est à 48° NORD et 2° EST. Dans quel hémisphère se trouve-t-elle ?",
      correction:
        "L'hémisphère nord, indiqué par la LATITUDE. La longitude ne dit rien du nord ou du sud.",
    },
    {
      micros: ["repere_defi"],
      question: "Quel est le symétrique du point (3 ; 5) par rapport à l'origine ?",
      correction: "$(-3 ; -5)$. La symétrie par rapport à l'origine change les deux coordonnées.",
    },
    {
      micros: ["repere_defi"],
      question: "Quel est le milieu du segment joignant (2 ; 4) et (8 ; 10) ?",
      correction:
        "$(2+8) \\div 2 = 5$ et $(4+10) \\div 2 = 7$, donc le milieu est $(5 ; 7)$.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesReperage4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Se repérer - 4e",
    section: {
      type: "objectif",
      phrase: "Donner assez de nombres pour lever l'ambiguïté",
      sousPhrase:
        "Un point sur une droite demande un nombre. Sur une feuille, deux. Dans une pièce, trois. C'est toujours la même idée.",
      encadre: {
        titre: "La règle d'or",
        texte:
          "L'ABSCISSE d'abord, toujours. Le point (3 ; 5) n'est pas le point (5 ; 3).",
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
          "Un bateau donne deux nombres, un avion trois — il peut quitter la surface. Les secours en mer travaillent au dixième de minute d'angle : à notre latitude, cela fait environ cent quatre-vingts mètres. Un chiffre après la virgule déplace la zone de recherche de la taille d'un stade.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Hipparque situait déjà les villes par latitude et longitude au deuxième siècle avant notre ère. Mais mesurer la longitude en mer supposait de connaître l'heure du port de départ : le Parlement britannique offrit une récompense énorme, remportée en 1765 par un horloger, John Harrison, et non par un astronome.",
      },
    },
  },
  {
    titre: "Une abscisse n'est pas une distance",
    badge: "La première distinction",
    section: {
      type: "objectif",
      phrase: "L'abscisse porte un signe",
      sousPhrase:
        "À gauche de l'origine elle est négative, à droite positive. Une distance, elle, est toujours positive : c'est ce qui les sépare.",
      encadre: {
        titre: "La distance",
        texte:
          "On soustrait la plus petite abscisse à la plus grande. De moins quatre à six : six moins moins quatre, soit dix.",
      },
    },
  },
  {
    titre: "Le piège de l'année",
    badge: "Ce qui coûte des points",
    section: {
      type: "objectif",
      phrase: "Dans un repère, l'axe des ordonnées MONTE",
      sousPhrase:
        "Aller vers le haut augmente l'ordonnée. Aller vers le bas la diminue. L'abscisse, elle, ne bouge pas.",
      encadre: {
        titre: "L'inverse d'un écran",
        texte:
          "Sur un écran d'ordinateur, l'origine est en haut à gauche et descendre AUGMENTE la coordonnée. Un repère de mathématiques n'est pas un écran.",
      },
    },
  },
  {
    titre: "Combien de nombres ?",
    badge: "La dimension du support",
    section: {
      type: "etapes",
      etapes: [
        "Une droite graduée : UN nombre, l'abscisse.",
        "Une feuille, un écran, un plan : DEUX nombres.",
        "Une pièce, le ciel, un pavé : TROIS nombres.",
        "⭐ La surface de la Terre : DEUX, bien qu'elle soit dans l'espace.",
        "Parce qu'on ne peut pas la quitter — c'est la dimension du SUPPORT qui compte.",
      ],
    },
  },
  {
    titre: "Sur la Terre",
    badge: "Latitude et longitude",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "La LATITUDE",
        contenu:
          "L'écart à l'équateur, vers le nord ou vers le sud. Elle ne dépasse jamais quatre-vingt-dix degrés, puisque le pôle est le maximum. Et c'est elle qui donne l'hémisphère.",
      },
      droite: {
        variante: "info",
        titre: "La LONGITUDE",
        contenu:
          "L'écart au méridien de Greenwich, vers l'est ou vers l'ouest. Elle monte jusqu'à cent quatre-vingts degrés. Un angle de plus de quatre-vingt-dix ne peut donc être qu'une longitude.",
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
          titre: "Lire une abscisse",
          texte:
            "Le côté donne le signe, le nombre de graduations multiplié par le pas donne la valeur.",
        },
        {
          titre: "Lire des coordonnées",
          texte:
            "On projette sur l'axe horizontal, puis sur le vertical. On écrit dans cet ordre.",
        },
        {
          titre: "Trouver un symétrique",
          texte:
            "Par un axe : une seule coordonnée change de signe. Par l'origine : les deux.",
        },
        {
          titre: "Trouver un milieu",
          texte:
            "Moyenne des abscisses, puis moyenne des ordonnées. Jamais les quatre nombres ensemble.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "On considère les points de coordonnées (2 ; 6) et (6 ; 2).",
      question: "Sont-ils au même endroit ?",
      correction:
        "Non. Le premier est à deux vers la droite et six vers le haut ; le second est à six vers la droite et deux vers le haut. Ce sont deux points différents, symétriques par rapport à la diagonale du repère. Ils ne se confondraient que si leurs deux coordonnées étaient égales, comme pour le point quatre-quatre. C'est exactement pour cela qu'on écrit toujours l'abscisse en premier : sans cette règle, une coordonnée ne désignerait rien.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Un bateau et un avion signalent leur position.",
      question: "Combien de nombres faut-il à chacun, et pourquoi ?",
      indice: "Demande-toi si l'objet peut quitter la surface.",
      correction:
        "Le bateau ne peut pas quitter la surface de la mer : deux nombres suffisent, la latitude et la longitude. L'avion, lui, peut monter : il faut un troisième nombre, l'altitude. La leçon vaut bien au-delà de cet exemple — le nombre de coordonnées est la dimension du support, pas celle du monde autour. C'est la même différence qu'entre une feuille et une salle de classe.",
    },
  },
];
