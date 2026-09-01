// ─── Fiche de cours : la trigonométrie (3e) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/trigonometrie.bank.ts, notionId trigo_trigonometrie).
//
// ⭐ LA CONTINUITÉ VERTICALE EST LE FIL, et elle est mesurée dans les micros :
//   4e  `trigo_cosinus` — SIX micros, et UN SEUL rapport : le cosinus.
//       Identifier hypoténuse et adjacent, écrire cos, calculer une longueur,
//       calculer un angle avec cos⁻¹, un problème, des défis.
//   3e  `trigo_trigonometrie` — HUIT micros : les deux autres rapports
//       arrivent (sinus, tangente), et surtout une micro entièrement nouvelle,
//       `trigo_choisir_rapport`, qui n'existait pas en 4e et pour cause : avec
//       un seul rapport, il n'y a rien à choisir.
// 👉 La fiche est donc bâtie autour de ce choix. Un élève de 3e qui échoue en
// trigonométrie ne se trompe presque jamais dans le calcul : il se trompe de
// rapport. C'est l'objet de « La méthode » et de « Selon ce que l'on cherche ».
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres
// de la fiche sortent de la banque :
//   trigo_triangle_rectangle → l'hypoténuse est en face de l'angle droit ;
//                              opposé et adjacent DÉPENDENT de l'angle choisi
//   trigo_cosinus            → cos = adjacent / hypoténuse ; cos ne dépasse pas 1
//   trigo_sinus              → sin = opposé / hypoténuse ; sin(30°) = 0,5
//   trigo_tangente           → tan = opposé / adjacent ; tan(45°) = 1
//   trigo_calculer_longueur  → hypoténuse 10 cm, angle 60° → adjacent 5 cm
//   trigo_calculer_angle     → adjacent 5 et hypoténuse 10 → 60° ; opposé =
//                              adjacent → 45°
//   trigo_choisir_rapport    → aucun angle en jeu : c'est Pythagore, pas la trigo
//   trigo_defi               → type brevet : hypoténuse 10, opposé 5 → 30°
//
// ⚠️ LA TAILLE DU CANVAS `triangle` EST CELLE DU BLOC, PAS 280. La banque
// demande `size: { width: 280 }`, mais le `viewBox` de ce canvas vaut son champ
// `size` et sa carte est plafonnée à 240 px : dans une carte de 222 px, tout
// est réduit de 21 %, et les libellés de 13 px tombent à 10,3 — sous le
// plancher mesuré. On demande donc la largeur DU BLOC, et l'échelle vaut 1.
//
// ⚠️ LES CLÉS DE CÔTÉ SONT `AB`, `BC`, `CA` — jamais `AC`. Le type
// `TriangleCanvasSideLabel` ne connaît que ces trois-là, et un `AC` passé en
// force par `as any` ne s'affiche tout simplement pas. C'est ainsi que le
// libellé « opposé » est resté invisible dans 29 questions de la banque de 3e
// jusqu'au 31/08.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// Largeurs mesurées à 375 px : 222 px pour une carte, 216 px pour la formule,
// 200 px pour un exemple.
const LARGEUR = { carte: 222, formule: 216, exemple: 200 } as const;
const HAUTEUR = (bloc: keyof typeof LARGEUR) => Math.round(LARGEUR[bloc] * 0.86);

/**
 * Le triangle rectangle en A, avec l'angle étudié en B.
 * ⚠️ Les libellés à l'INTÉRIEUR du dessin sont en écriture simple : ils sont
 * tracés en `<text>` SVG, où le LaTeX s'afficherait en clair.
 */
const triangle = (
  cotes: { AB?: string; BC?: string; CA?: string },
  bloc: keyof typeof LARGEUR = "carte",
  angleLabel = "θ",
) => (
  <CanvasRenderer
    figure={
      {
        kind: "triangle",
        // ⛔ LES SOMMETS ÉTAIENT EN DUR — corrigé après mesure. Calés sur une
        // largeur de 222 px, ils débordaient du cadre dans les blocs
        // « exemple », qui n'en font que 200 : le B et son libellé sortaient.
        // Le `viewBox` valant le champ `size`, les points doivent être une
        // FRACTION de la largeur du bloc, pas un nombre de pixels.
        // ⛔⛔ « hypoténuse » ET « opposé » SE CHEVAUCHAIENT, ET C'EST
        // STRUCTUREL. Le triangle étant rectangle en A, A et B sont à la même
        // hauteur — donc le milieu de [CA] et le milieu de [BC] aussi. Les deux
        // libellés sont toujours sur LA MÊME LIGNE : seule leur distance
        // horizontale peut les séparer. Mesuré à 222 px avec A et C en 0,18 W :
        // « opposé » s'arrêtait en 69 et « hypoténuse » commençait en 63.
        // 👉 On pousse donc le côté vertical vers la gauche et B vers la droite,
        // ce qui écarte les deux milieux. Vérifié : 6 px de blanc à 222 px,
        // 4 px à 216 px, et rien ne sort du cadre.
        // ⚠️ ET CET ÉCARTEMENT NE VAUT PAS POUR LES BLOCS « EXEMPLE ». Pousser
        // B jusqu'à 0,90 de la largeur fait sortir SON PROPRE libellé du cadre
        // quand celui-ci n'a que 200 px (mesuré : deux « B » dehors). Les
        // exemples portent des libellés courts (« 5 cm », « 10 cm ») qui ne se
        // chevauchent pas : ils n'ont pas besoin de cet écartement.
        points: {
          A: { x: 0.14 * LARGEUR[bloc], y: 0.78 * HAUTEUR(bloc) },
          B: { x: (bloc === "exemple" ? 0.82 : 0.9) * LARGEUR[bloc], y: 0.78 * HAUTEUR(bloc) },
          C: { x: 0.14 * LARGEUR[bloc], y: 0.26 * HAUTEUR(bloc) },
        },
        labels: { A: "A", B: "B", C: "C" },
        sideLabels: cotes,
        angleLabels: { B: angleLabel },
        marks: { rightAngleAt: "A" },
        display: { showPoints: true, showLabels: true, showSides: true, showAngles: true },
        size: { width: LARGEUR[bloc], height: HAUTEUR(bloc) },
      } as never
    }
  />
);

const tableau = (
  data: Record<string, unknown>,
  bloc: keyof typeof LARGEUR = "carte"
) => (
  <CanvasRenderer
    figure={
      { kind: "tableau_donnees", display: { compact: bloc !== "carte" }, ...data } as never
    }
  />
);

export const ficheTrigonometrie3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "trigo-trigonometrie",
  titre: "Trigonométrie : sinus, cosinus, tangente",
  accroche:
    "En quatrième, un seul rapport : le cosinus. En troisième il en arrive deux autres, et avec eux la vraie question du chapitre — laquelle des trois formules employer. Un élève qui rate un exercice de trigonométrie se trompe rarement dans le calcul : il se trompe de rapport.",
  identite: [
    { label: "Prérequis", valeur: "Triangle rectangle, Pythagore, cosinus (4e)" },
    { label: "L'idée clé", valeur: "Deux côtés connus sur trois : le rapport est décidé" },
    { label: "Outil", valeur: "Calculatrice en mode DEGRÉS" },
  ],
  definition: {
    texte:
      "Dans un triangle rectangle, chaque angle aigu définit trois rapports de longueurs. L'HYPOTÉNUSE est toujours le côté en face de l'angle droit : elle ne change jamais. Les deux autres, en revanche, dépendent de l'angle que l'on regarde : le côté OPPOSÉ est celui d'en face, le côté ADJACENT est celui qui touche l'angle sans être l'hypoténuse. Le cosinus vaut adjacent divisé par hypoténuse, le sinus opposé divisé par hypoténuse, la tangente opposé divisé par adjacent.",
  },
  figure: {
    schema: legende(
      triangle({ AB: "adjacent", CA: "opposé", BC: "hypoténuse" }),
      "vus depuis l'angle $\\theta$ : l'hypoténuse ne bouge pas, les deux autres changent",
    ),
    legende:
      "Le triangle est rectangle en A. Vu depuis l'angle B, le côté AC est opposé et le côté AB adjacent. Vu depuis C, les deux échangent leurs rôles.",
  },
  proprietes: [
    {
      titre: "L'hypoténuse ne dépend pas de l'angle",
      texte:
        "C'est le côté en face de l'angle droit, et c'est aussi le plus long des trois. On la repère EN PREMIER, avant même de choisir une formule : les trois rapports se définissent par rapport à elle.",
      micros: ["trigo_triangle_rectangle"],
      schema: legende(
        triangle({ BC: "hypoténuse" }),
        "en face de l'angle droit, et toujours la plus longue",
      ),
    },
    {
      titre: "Opposé et adjacent changent avec l'angle",
      texte:
        "C'est la source d'erreur numéro un du chapitre. Le côté opposé est en face de l'angle étudié, l'adjacent le touche sans être l'hypoténuse. Si l'on change d'angle aigu, les deux échangent leurs noms — alors que le triangle, lui, n'a pas bougé.",
      micros: ["trigo_triangle_rectangle"],
      schema: tableau({
        headers: ["vu depuis", "opposé", "adjacent"],
        rows: [
          { values: ["l'angle B", "AC", "AB"] },
          { values: ["l'angle C", "AB", "AC"] },
        ],
        caption: "le même triangle, deux lectures",
      }),
    },
    {
      titre: "Le cosinus : adjacent sur hypoténuse",
      texte:
        "Le cosinus d'un angle aigu est le quotient du côté adjacent par l'hypoténuse. Comme l'hypoténuse est le plus long côté, ce quotient est toujours inférieur à 1 : un cosinus supérieur à 1 signale une erreur, jamais un triangle bizarre.",
      micros: ["trigo_cosinus"],
      schema: legende(
        triangle({ AB: "adjacent", BC: "hypoténuse" }),
        "$\\cos(\\theta) = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}}$",
      ),
    },
    {
      titre: "Le sinus : opposé sur hypoténuse",
      texte:
        "Le sinus d'un angle aigu est le quotient du côté opposé par l'hypoténuse. Lui aussi reste inférieur à 1, pour la même raison. Et comme les deux angles aigus se complètent, le sinus de l'un vaut le cosinus de l'autre : sin(30°) et cos(60°) valent tous deux 0,5.",
      micros: ["trigo_sinus"],
      schema: legende(
        triangle({ CA: "opposé", BC: "hypoténuse" }),
        "$\\sin(\\theta) = \\dfrac{\\text{opposé}}{\\text{hypoténuse}}$",
      ),
    },
    {
      titre: "La tangente : opposé sur adjacent",
      texte:
        "La tangente est la seule des trois qui n'utilise pas l'hypoténuse : c'est le quotient de l'opposé par l'adjacent. Elle n'est donc pas bornée par 1 — tan(45°) vaut exactement 1, et elle grandit sans limite quand l'angle approche 90°.",
      micros: ["trigo_tangente"],
      schema: legende(
        triangle({ AB: "adjacent", CA: "opposé" }),
        "$\\tan(\\theta) = \\dfrac{\\text{opposé}}{\\text{adjacent}}$",
      ),
    },
    {
      titre: "Les deux angles aigus se complètent",
      texte:
        "La somme des angles d'un triangle vaut 180°, et l'angle droit en prend 90 : il reste 90° à partager entre les deux angles aigus. Si l'un mesure 40°, l'autre mesure 50°. C'est un contrôle gratuit sur tout résultat d'angle.",
      micros: ["trigo_triangle_rectangle", "trigo_calculer_angle"],
      schema: tableau({
        headers: ["un angle", "l'autre"],
        rows: [
          { values: ["40°", "50°"] },
          { values: ["30°", "60°"] },
          { values: ["45°", "45°"] },
        ],
        caption: "leur somme fait toujours 90°",
      }),
    },
    {
      titre: "Deux côtés connus décident du rapport",
      texte:
        "On ne choisit pas la formule, on la LIT sur les données. Adjacent et hypoténuse : cosinus. Opposé et hypoténuse : sinus. Opposé et adjacent, sans hypoténuse : tangente. Et si aucun angle n'intervient, ce n'est pas de la trigonométrie du tout, c'est Pythagore.",
      micros: ["trigo_choisir_rapport"],
      schema: tableau({
        headers: ["ce que l'on a", "on utilise"],
        rows: [
          { values: ["adjacent + hypoténuse", "cosinus"] },
          { values: ["opposé + hypoténuse", "sinus"] },
          { values: ["opposé + adjacent", "tangente"] },
          { values: ["trois côtés, aucun angle", "Pythagore"] },
        ],
        highlight: { col: 1 },
        caption: "les données décident, pas l'élève",
      }),
    },
  ],
  reel: {
    texte:
      "La trigonométrie mesure ce qu'on ne peut pas atteindre. Depuis le pied du Piton de la Fournaise, un angle de visée et une distance au sol donnent une hauteur qu'aucun décamètre ne mesurerait. C'est le principe du théodolite des géomètres, de la pente d'une toiture calculée avant de la construire, de l'inclinaison d'un panneau solaire, et de la rampe d'accès dont la norme impose une pente maximale. Partout où l'on connaît un angle et une longueur, la trigonométrie donne l'autre longueur.",
  },
  historique: {
    texte:
      "Elle naît de l'astronomie : au IIe siècle avant notre ère, Hipparque de Nicée dresse la première table de cordes pour prévoir la position des astres. Les mathématiciens indiens, autour du Ve siècle, remplacent la corde par la demi-corde — leur mot voyage jusqu'en arabe, puis est traduit en latin par « sinus », qui signifiait « pli » : le sinus doit son nom à un contresens de traducteur. Le mot « tangente », lui, vient du latin « toucher ».",
  },
  formule: {
    contexte: "Les trois rapports, dans un triangle rectangle",
    expression:
      "$\\cos\\theta = \\dfrac{\\text{adj}}{\\text{hyp}} \\quad \\sin\\theta = \\dfrac{\\text{opp}}{\\text{hyp}} \\quad \\tan\\theta = \\dfrac{\\text{opp}}{\\text{adj}}$",
    legende:
      "Deux rapports sur trois emploient l'hypoténuse ; seule la tangente s'en passe. Un cosinus ou un sinus supérieur à 1 est toujours une erreur.",
    schema: legende(
      triangle({ AB: "adjacent", CA: "opposé", BC: "hypoténuse" }, "formule"),
      "les trois côtés, vus depuis $\\theta$",
    ),
  },
  methode: [
    {
      titre: "Repérer l'hypoténuse en premier",
      texte:
        "Avant toute chose, on trouve l'angle droit et on nomme l'hypoténuse : le côté d'en face. Sans elle, impossible de savoir lequel des deux autres est l'opposé et lequel est l'adjacent.",
      micros: ["trigo_triangle_rectangle"],
    },
    {
      titre: "Se placer sur l'angle étudié",
      texte:
        "On se met « dans » l'angle marqué. Le côté d'en face est l'opposé, celui qui touche l'angle est l'adjacent. Changer d'angle change ces deux noms, jamais l'hypoténuse.",
      micros: ["trigo_triangle_rectangle"],
      schema: legende(
        triangle({ AB: "adjacent", CA: "opposé", BC: "hypoténuse" }),
        "on se place sur $\\theta$, puis on nomme",
      ),
    },
    {
      titre: "Lire le rapport sur les données",
      texte:
        "On entoure les deux longueurs connues (ou la longueur connue et celle cherchée), et on lit dans le tableau quel rapport les relie. Le choix n'est jamais libre.",
      micros: ["trigo_choisir_rapport"],
    },
    {
      titre: "Isoler ce que l'on cherche",
      texte:
        "Pour une longueur, on transforme l'égalité : de cos(θ) = adjacent / hypoténuse on tire adjacent = hypoténuse × cos(θ). Pour un angle, on emploie la touche inverse : cos⁻¹, sin⁻¹ ou tan⁻¹, calculatrice en mode degrés.",
      micros: ["trigo_calculer_longueur", "trigo_calculer_angle"],
    },
  ],
  usages: [
    {
      titre: "On cherche une longueur",
      detail:
        "On connaît un angle et une longueur : on écrit le rapport, puis on multiplie. Hypoténuse 10 cm et angle 60° donnent un adjacent de 10 × cos(60°) = 5 cm.",
      micros: ["trigo_calculer_longueur"],
    },
    {
      titre: "On cherche un angle",
      detail:
        "On connaît deux longueurs : on écrit le rapport, puis on applique la fonction inverse. Opposé 5 et hypoténuse 10 donnent sin⁻¹(0,5) = 30°.",
      micros: ["trigo_calculer_angle"],
    },
    {
      titre: "On ne connaît aucun angle",
      detail:
        "Trois côtés et pas d'angle : la trigonométrie ne sert à rien ici, c'est le théorème de Pythagore qu'il faut employer.",
      micros: ["trigo_choisir_rapport"],
    },
  ],
  exemples: [
    {
      titre: "Une longueur avec le cosinus",
      donnees:
        "Triangle rectangle. L'hypoténuse mesure 10 cm et l'angle θ vaut 60°. On cherche le côté adjacent à θ.",
      question: "Combien mesure le côté adjacent ?",
      solution:
        "On a l'hypoténuse et on cherche l'adjacent : c'est le cosinus. On écrit cos(60°) = adjacent / 10, donc adjacent = 10 × cos(60°) = 10 × 0,5 = 5 cm.",
      micros: ["trigo_calculer_longueur"],
      schema: legende(
        triangle({ AB: "adjacent = ?", BC: "10 cm" }, "exemple", "60°"),
        "on connaît l'hypoténuse, on cherche l'adjacent",
      ),
    },
    {
      titre: "Un angle avec le cosinus",
      donnees:
        "Le côté adjacent à l'angle θ mesure 5 cm et l'hypoténuse 10 cm.",
      question: "Combien vaut θ ?",
      solution:
        "cos(θ) = 5 / 10 = 0,5. On applique la fonction inverse : θ = cos⁻¹(0,5) = 60°. Contrôle : l'autre angle aigu vaut donc 30°, et 60 + 30 = 90.",
      micros: ["trigo_calculer_angle"],
    },
    {
      titre: "Un angle avec la tangente",
      donnees:
        "Dans un triangle rectangle, le côté opposé à θ et le côté adjacent à θ sont égaux.",
      question: "Combien vaut θ ?",
      solution:
        "tan(θ) = opposé / adjacent = 1, puisque les deux longueurs sont égales. Or tan(45°) = 1, donc θ = 45°. Le triangle est rectangle isocèle, et l'autre angle aigu vaut aussi 45°.",
      micros: ["trigo_tangente", "trigo_calculer_angle"],
    },
    {
      titre: "Type brevet",
      donnees:
        "L'hypoténuse mesure 10 cm et le côté opposé à l'angle θ mesure 5 cm.",
      question: "Combien vaut θ ?",
      solution:
        "Opposé et hypoténuse : c'est le sinus. sin(θ) = 5 / 10 = 0,5, donc θ = sin⁻¹(0,5) = 30°. Attention à ne pas prendre le cosinus par habitude : c'est l'opposé qui est donné, pas l'adjacent.",
      micros: ["trigo_defi", "trigo_choisir_rapport"],
      schema: legende(
        triangle({ CA: "5 cm", BC: "10 cm" }, "exemple"),
        "l'opposé et l'hypoténuse : donc le sinus",
      ),
    },
  ],
  pieges: [
    "Employer le cosinus par habitude. Le rapport se lit sur les données : opposé et hypoténuse appellent le sinus, pas le cosinus.",
    "Croire que l'opposé et l'adjacent sont fixes. Ils échangent leurs noms dès qu'on regarde l'autre angle aigu ; seule l'hypoténuse ne change jamais.",
    "Trouver un cosinus ou un sinus supérieur à 1 et le garder : c'est impossible, l'hypoténuse étant le plus long côté. Le calcul est à refaire.",
    "Oublier de passer la calculatrice en mode DEGRÉS : en radians, cos(60) ne vaut pas 0,5 mais −0,95.",
    "Sortir la trigonométrie quand aucun angle n'intervient : avec trois côtés et pas d'angle, c'est Pythagore.",
    "Confondre cos(θ) et cos⁻¹ : la première donne un nombre à partir d'un angle, la seconde un angle à partir d'un nombre.",
  ],
  aRetenir: [
    "L'hypoténuse est en face de l'angle droit ; elle ne dépend pas de l'angle étudié.",
    "Opposé et adjacent, si : ils échangent quand on change d'angle aigu.",
    "cos = adjacent / hypoténuse ; sin = opposé / hypoténuse ; tan = opposé / adjacent.",
    "Seule la tangente n'utilise pas l'hypoténuse : elle peut dépasser 1, les deux autres jamais.",
    "Pour un angle, on emploie cos⁻¹, sin⁻¹ ou tan⁻¹, en mode degrés.",
    "Aucun angle en jeu : ce n'est pas de la trigonométrie, c'est Pythagore.",
  ],
  entrainement: [
    {
      question:
        "Dans un triangle rectangle en A, quel côté est opposé à l'angle B ?",
      correction:
        "Le côté AC : c'est celui qui est en face de l'angle B. Le côté AB, lui, touche l'angle B sans être l'hypoténuse — c'est l'adjacent.",
      micros: ["trigo_triangle_rectangle"],
    },
    {
      question:
        "Un angle aigu d'un triangle rectangle mesure 40°. Combien mesure l'autre ?",
      correction:
        "50°. L'angle droit occupe 90° des 180° du triangle : il en reste 90 pour les deux angles aigus, et 90 − 40 = 50.",
      micros: ["trigo_triangle_rectangle"],
    },
    {
      question:
        "On connaît le côté opposé et le côté adjacent, mais pas l'hypoténuse. Quel rapport employer ?",
      correction:
        "La tangente : c'est la seule des trois qui relie l'opposé et l'adjacent sans passer par l'hypoténuse.",
      micros: ["trigo_choisir_rapport"],
    },
    {
      question: "Sachant que sin(30°) = 0,5, que vaut cos(60°) ?",
      correction:
        "0,5 également. Les deux angles aigus se complètent : le sinus de l'un est le cosinus de l'autre.",
      micros: ["trigo_sinus"],
    },
    {
      question:
        "Le cosinus d'un angle aigu peut-il valoir 1,2 ?",
      correction:
        "Non. Le cosinus est le quotient de l'adjacent par l'hypoténuse, et l'hypoténuse est le plus long côté : le quotient est donc toujours inférieur à 1. Un tel résultat signale une erreur de calcul.",
      micros: ["trigo_cosinus"],
    },
    {
      question:
        "Dans un triangle rectangle, l'hypoténuse mesure 10 cm et le côté adjacent à l'angle θ mesure 5 cm. Combien vaut θ ?",
      correction:
        "Adjacent et hypoténuse : c'est le cosinus. cos(θ) = 5 / 10 = 0,5, donc θ = cos⁻¹(0,5) = 60°.",
      micros: ["trigo_calculer_angle"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

export const slidesTrigonometrie3e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Trigonométrie - 3e",
    section: {
      type: "objectif",
      phrase: "Trois rapports, et surtout : lequel choisir",
      sousPhrase:
        "En quatrième, il n'y avait que le cosinus — donc rien à choisir. En troisième, le sinus et la tangente arrivent, et c'est le choix qui devient l'exercice.",
      encadre: {
        titre: "La règle",
        texte:
          "On ne choisit pas la formule : on la lit sur les données. Deux côtés connus, et le rapport est décidé.",
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
          "La trigonométrie mesure ce qu'on ne peut pas atteindre : la hauteur d'un piton depuis son pied, la pente d'une toiture avant de la bâtir, l'inclinaison d'un panneau solaire, la pente maximale d'une rampe d'accès.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le mot « sinus » vient d'un contresens. Les mathématiciens indiens parlaient de la demi-corde ; le mot a voyagé jusqu'en arabe, puis un traducteur latin l'a rendu par sinus, qui voulait dire « pli ».",
      },
    },
  },
  {
    titre: "Choisir le bon rapport",
    badge: "La méthode",
    section: {
      type: "etapes",
      etapes: [
        "Trouver l'angle droit, et nommer l'hypoténuse : c'est le côté d'en face.",
        "Se placer sur l'angle étudié : le côté d'en face est l'opposé, celui qui le touche est l'adjacent.",
        "Regarder les deux longueurs en jeu. Adjacent et hypoténuse : cosinus. Opposé et hypoténuse : sinus. Opposé et adjacent : tangente.",
        "Si aucun angle n'intervient, ce n'est pas de la trigonométrie : c'est Pythagore.",
      ],
    },
  },
  {
    titre: "Le piège du chapitre",
    badge: "À ne pas rater",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce que l'on fait",
        contenu:
          "On sort le cosinus par habitude, parce que c'est celui de l'an dernier — même quand c'est le côté opposé qui est donné.",
      },
      droite: {
        variante: "info",
        titre: "Ce qu'il faut faire",
        contenu:
          "Regarder QUELS côtés sont en jeu. L'énoncé a déjà choisi le rapport ; il ne reste qu'à le lire. Et un cosinus supérieur à 1 n'est jamais un triangle bizarre : c'est une erreur.",
      },
    },
  },
];
