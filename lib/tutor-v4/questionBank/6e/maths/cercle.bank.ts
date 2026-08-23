// ─── Le cercle et le périmètre du disque (6e) ──────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (21/08/2026). L'extrait du BO envoyé par
// Frédéric liste, pour les périmètres en 6e :
//   · savoir que le périmètre du disque est PROPORTIONNEL à son diamètre ;
//   · connaître la formule du périmètre d'un disque ;
//   · calculer le périmètre d'un disque ;
//   · calculer des périmètres de figures composées ;
//   · résoudre des problèmes impliquant des longueurs.
//
// Le coach n'avait AUCUNE micro cercle, disque, rayon ou diamètre — ni en 6e,
// ni dans aucune autre classe de maths. `aire_perimetre` s'arrêtait au carré,
// au rectangle et à la figure quelconque. Un chapitre entier du programme était
// invisible, et rien ne le signalait : un vérificateur compte les items d'une
// micro, aucun ne demande si une micro manque.
//
// Découpage (notions courtes : 4 micros) :
//   cercle_vocabulaire   centre, rayon, diamètre, d = 2 × r
//   cercle_proportionnel le tour grandit COMME le diamètre — double, triple
//   cercle_perimetre     P = π × d = 2 × π × r, et on calcule
//   cercle_defi          les défis, roue et rond-point
//
// ⭐ La proportionnalité vient AVANT la formule, comme dans le BO : π n'est pas
// un nombre tombé du ciel, c'est le quotient P ÷ d, le même pour tous les
// disques. C'est ce que montre le canvas `tableau_proportionnalite`.
//
// Valeur approchée retenue partout : π ≈ 3,14 (convention 6e).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : le périmètre d’un disque est la longueur de son tour, le cercle.\n\n" +
    "Méthode : on repère le rayon ou le diamètre, puis on utilise P = π × d, avec d = 2 × r.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/**
 * LE CERCLE COMME ENSEMBLE DE POINTS — avec des points posés à des distances
 * choisies du centre : sur le cercle, dedans, dehors.
 *
 * ⭐ C'est la figure qui fait basculer la définition. Tant qu'on ne voit qu'un
 * rond, le cercle est une FORME ; dès qu'on y pose des points en disant leur
 * distance à O, il devient un ENSEMBLE — ce que le BO demande de comprendre.
 *
 * `distances` est exprimé en fraction du rayon : 1 = sur le cercle, 0,6 =
 * dedans, 1,4 = dehors.
 */
function cercleDesPoints(
  pts: { id: string; distance: number; angle: number; highlight?: boolean }[],
  options?: { disque?: boolean }
) {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: {
      cx,
      cy,
      r,
      showCircle: true,
      showDisk: options?.disque ?? false,
    },
    points: [
      { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
      ...pts.map((p) => ({
        id: p.id,
        x: cx + p.distance * r * Math.cos((p.angle * Math.PI) / 180),
        y: cy - p.distance * r * Math.sin((p.angle * Math.PI) / 180),
        label: p.id,
        highlight: p.highlight,
      })),
    ],
    segments: pts.map((p) => ({
      id: `s_${p.id}`,
      kind: "segment" as const,
      from: "O",
      to: p.id,
      dashed: true,
    })),
    display: {
      showLabels: true,
      showPoints: true,
      showCenter: true,
      showDisk: options?.disque ?? false,
    },
  };
}

/** Un cercle portant une CORDE — le mot du BO qu'aucun item ne posait. */
function cercleAvecCorde() {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: { cx, cy, r, showCircle: true },
    points: [
      { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
      { id: "A", x: cx + r * Math.cos((140 * Math.PI) / 180), y: cy - r * Math.sin((140 * Math.PI) / 180), label: "A" },
      { id: "B", x: cx + r * Math.cos((40 * Math.PI) / 180), y: cy - r * Math.sin((40 * Math.PI) / 180), label: "B" },
    ],
    segments: [
      { id: "c1", kind: "corde" as const, from: "A", to: "B", label: "[AB]", highlight: true },
    ],
    display: { showLabels: true, showPoints: true, showCenter: true, showChord: true },
  };
}

/** Un cercle de centre O, avec le segment demandé mis en avant. */
function cercleAvec(segment: "rayon" | "diametre", label?: string) {
  const cx = 170;
  const cy = 130;
  const r = 80;
  return {
    kind: "cercle" as const,
    size: { width: 340, height: 260 },
    circle: { cx, cy, r, showCircle: true },
    points:
      segment === "rayon"
        ? [
            { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
            { id: "A", x: cx + r, y: cy, label: "A" },
          ]
        : [
            { id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true },
            { id: "A", x: cx - r, y: cy, label: "A" },
            { id: "B", x: cx + r, y: cy, label: "B" },
          ],
    segments:
      segment === "rayon"
        ? [{ id: "s1", kind: "rayon" as const, from: "O", to: "A", label, highlight: true }]
        : [{ id: "s1", kind: "diametre" as const, from: "A", to: "B", label, highlight: true }],
    display: { showLabels: true, showPoints: true, showCenter: true },
  };
}

/** Le tableau « diamètre → périmètre » : la proportionnalité se VOIT. */
function tableauTour(diametres: number[], manquant: number) {
  return {
    kind: "tableau_proportionnalite" as const,
    rows: 2,
    cols: diametres.length,
    rowLabels: ["Diamètre (cm)", "Tour (cm)"],
    values: [
      diametres.map((d) => String(d)),
      diametres.map((d) => String(Number((d * 3.14).toFixed(2))).replace(".", ",")),
    ],
    missing: [{ row: 1, col: manquant }],
    display: { showRowLabels: true, showMissing: true, showGrid: true },
  };
}

export const cercleBank: TutorBankItemV4[] = [
  // =========================
  // CERCLE_VOCABULAIRE
  // =========================
  {
    kind: "fixed",
    id: "cercle_vocabulaire_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Comment s’appelle le segment [OA] ?",
    format: "qcm",
    choices: ["un rayon", "un diamètre", "une corde", "un arc"],
    expected: ["un rayon"],
    comparator: "mcq_exact",
    hint: "Il part du centre O et s’arrête sur le cercle.",
    explanation: expl(
      "Un segment qui joint le centre à un point du cercle est un rayon. Le diamètre, lui, traverse le cercle en passant par le centre."
    ),
    tags: ["cercle_disque", "vocabulaire", "canvas", "qcm"],
    canvas: cercleAvec("rayon", "rayon"),
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Comment s’appelle le segment [AB] ?",
    format: "qcm",
    choices: ["un diamètre", "un rayon", "une corde qui évite le centre", "un arc de cercle"],
    expected: ["un diamètre"],
    comparator: "mcq_exact",
    hint: "Il joint deux points du cercle EN PASSANT par le centre.",
    explanation: expl(
      "Un segment qui joint deux points du cercle en passant par le centre est un diamètre. Il vaut deux rayons."
    ),
    tags: ["cercle_disque", "vocabulaire", "canvas", "qcm"],
    canvas: cercleAvec("diametre", "diamètre"),
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un cercle a un rayon de 4 cm. Combien mesure son diamètre ?",
    format: "short",
    expected: ["8", "8 cm"],
    comparator: "number_equal",
    hint: "Le diamètre vaut deux fois le rayon.",
    explanation: expl("d = 2 × r = 2 × 4 = 8 cm."),
    tags: ["cercle_disque", "vocabulaire", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "Un cercle a un diamètre de 10 cm. Combien mesure son rayon ?",
    format: "short",
    expected: ["5", "5 cm"],
    comparator: "number_equal",
    hint: "Le rayon est la moitié du diamètre.",
    explanation: expl("r = d ÷ 2 = 10 ÷ 2 = 5 cm."),
    tags: ["cercle_disque", "vocabulaire", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre un cercle et un disque ?",
    format: "qcm",
    choices: [
      "le cercle est le tour, le disque est le tour et tout l’intérieur",
      "le disque est le tour, le cercle est le tour et tout l’intérieur",
      "ce sont deux mots pour la même chose",
      "le cercle est plat, le disque est en relief",
    ],
    expected: ["le cercle est le tour, le disque est le tour et tout l’intérieur"],
    comparator: "mcq_exact",
    hint: "Une pièce de monnaie, c’est un disque ; son bord, c’est un cercle.",
    explanation: expl(
      "Le cercle est la ligne, le contour. Le disque est cette ligne AVEC tout l’intérieur : c’est pour cela qu’on parle du périmètre du disque et de l’aire du disque."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Combien un cercle a-t-il de rayons différents ?",
    format: "qcm",
    choices: ["une infinité", "un seul", "deux", "quatre"],
    expected: ["une infinité"],
    comparator: "mcq_exact",
    hint: "On peut joindre le centre à n’importe quel point du cercle.",
    explanation: expl(
      "Chaque point du cercle donne un rayon, et il y en a une infinité. Tous ont la même longueur : c’est justement ce qui définit le cercle."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_vocabulaire_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    text: "Avec quel instrument trace-t-on un cercle de rayon 3 cm ?",
    format: "qcm",
    choices: [
      "un compas, écarté de 3 cm",
      "une règle, posée sur 3 cm",
      "une équerre, calée sur 3 cm",
      "un rapporteur, ouvert à 3°",
    ],
    expected: ["un compas, écarté de 3 cm"],
    comparator: "mcq_exact",
    hint: "L’écartement du compas EST le rayon.",
    explanation: expl(
      "On pointe le compas sur le centre et on l’écarte de 3 cm : la mine reste à 3 cm du centre tout au long du tracé, ce qui donne exactement le cercle de rayon 3 cm."
    ),
    tags: ["cercle_disque", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "cercle_vocabulaire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le diamètre vaut deux fois le rayon.",
    tags: ["cercle_disque", "vocabulaire", "template"],
    generate: () => {
      const r = randomInt(2, 12);
      return {
        text: `Un cercle a un rayon de ${r} cm. Combien mesure son diamètre ?`,
        format: "short",
        expected: [String(2 * r), `${2 * r} cm`],
        comparator: "number_equal",
        explanation: expl(`d = 2 × r = 2 × ${r} = ${2 * r} cm.`),
        // Le dessin naît DANS le generate : la figure doit dire les mêmes
        // nombres que l'énoncé, sinon elle ment.
        canvas: cercleAvec("rayon", `${r} cm`),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_vocabulaire_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Le rayon est la moitié du diamètre.",
    tags: ["cercle_disque", "vocabulaire", "template"],
    generate: () => {
      const r = randomInt(2, 12);
      const d = 2 * r;
      return {
        text: `Un cercle a un diamètre de ${d} cm. Combien mesure son rayon ?`,
        format: "short",
        expected: [String(r), `${r} cm`],
        comparator: "number_equal",
        explanation: expl(`r = d ÷ 2 = ${d} ÷ 2 = ${r} cm.`),
        canvas: cercleAvec("diametre", `${d} cm`),
      };
    },
  },

  // =========================
  // CERCLE_PROPORTIONNEL
  // =========================
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 1,
    theme: "neutral",
    text: "On double le diamètre d’un disque. Que devient le tour du disque ?",
    format: "qcm",
    choices: ["il double", "il ne change pas", "il augmente de 2 cm", "il est multiplié par 4"],
    expected: ["il double"],
    comparator: "mcq_exact",
    hint: "Le tour et le diamètre grandissent ensemble, dans le même rapport.",
    explanation: expl(
      "Le périmètre d’un disque est proportionnel à son diamètre : si le diamètre double, le tour double aussi."
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Un disque de diamètre 1 m a un tour de 3,14 m. Quel est le tour d’un disque de diamètre 3 m ?",
    format: "short",
    expected: ["9,42", "9.42", "9,42 m"],
    comparator: "number_equal",
    hint: "Un diamètre 3 fois plus grand donne un tour 3 fois plus grand.",
    explanation: expl(
      "Le tour est proportionnel au diamètre : 3 × 3,14 = 9,42 m. On n’a même pas besoin de la formule, seulement de la proportionnalité."
    ),
    tags: ["cercle_disque", "proportionnalite", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tous les disques, on divise le tour par le diamètre. Que trouve-t-on ?",
    format: "qcm",
    choices: [
      "toujours le même nombre, environ 3,14",
      "un nombre différent pour chaque disque",
      "toujours 2",
      "un nombre qui grandit avec le disque",
    ],
    expected: ["toujours le même nombre, environ 3,14"],
    comparator: "mcq_exact",
    hint: "C’est ce nombre qu’on appelle π.",
    explanation: expl(
      "Tour ÷ diamètre donne toujours le même nombre, quel que soit le disque : environ 3,14. Ce nombre s’appelle π. C’est exactement ce que veut dire « le tour est proportionnel au diamètre »."
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    text: "Le tableau est un tableau de proportionnalité. Quel est le tour d’un disque de diamètre 4 cm ?",
    format: "short",
    expected: ["12,56", "12.56", "12,56 cm"],
    comparator: "number_equal",
    hint: "Le coefficient du tableau est toujours le même : environ 3,14.",
    explanation: expl(
      "On multiplie le diamètre par 3,14 : 4 × 3,14 = 12,56 cm. La colonne manquante se complète comme dans n’importe quel tableau de proportionnalité."
    ),
    tags: ["cercle_disque", "proportionnalite", "canvas"],
    canvas: tableauTour([1, 2, 3, 4], 3),
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    text: "Deux roues : l’une a un diamètre de 20 cm, l’autre de 60 cm. Le tour de la grande vaut…",
    format: "qcm",
    choices: [
      "3 fois le tour de la petite",
      "le même que la petite",
      "40 cm de plus que la petite",
      "9 fois le tour de la petite",
    ],
    expected: ["3 fois le tour de la petite"],
    comparator: "mcq_exact",
    hint: "60 ÷ 20 = 3.",
    explanation: expl(
      "Le diamètre est multiplié par 3, donc le tour aussi : la proportionnalité conserve le rapport. (Attention : c’est l’AIRE qui serait multipliée par 9.)"
    ),
    tags: ["cercle_disque", "proportionnalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_proportionnel_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    text: "Un disque a un tour de 6,28 cm pour un diamètre de 2 cm. Quel diamètre donne un tour de 18,84 cm ?",
    format: "short",
    expected: ["6", "6 cm"],
    comparator: "number_equal",
    hint: "18,84 ÷ 6,28 = 3 : le tour est 3 fois plus grand.",
    explanation: expl(
      "Le tour est multiplié par 3 (6,28 × 3 = 18,84), donc le diamètre aussi : 2 × 3 = 6 cm."
    ),
    tags: ["cercle_disque", "proportionnalite", "short"],
  },
  {
    kind: "template",
    id: "cercle_proportionnel_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche par combien le diamètre est multiplié.",
    tags: ["cercle_disque", "proportionnalite", "template"],
    generate: () => {
      const d = randomInt(2, 6);
      const k = randomInt(2, 5);
      const tour = Number((d * 3.14).toFixed(2));
      const grand = Number((d * k * 3.14).toFixed(2));
      const fr = (x: number) => String(x).replace(".", ",");
      return {
        text: `Un disque de diamètre ${d} cm a un tour de ${fr(tour)} cm. Quel est le tour d’un disque de diamètre ${d * k} cm ?`,
        format: "short",
        expected: [fr(grand), String(grand)],
        comparator: "number_equal",
        explanation: expl(
          `Le diamètre est multiplié par ${k}, donc le tour aussi : ${fr(tour)} × ${k} = ${fr(grand)} cm.`
        ),
        canvas: tableauTour([d, d * k], 1),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_proportionnel_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_proportionnel",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans le tableau, on passe du diamètre au tour en multipliant par 3,14.",
    tags: ["cercle_disque", "proportionnalite", "template"],
    generate: () => {
      const d = randomInt(2, 9);
      const tour = Number((d * 3.14).toFixed(2));
      const fr = (x: number) => String(x).replace(".", ",");
      return {
        text: `Complète le tableau : quel est le tour d’un disque de diamètre ${d} cm ?`,
        format: "short",
        expected: [fr(tour), String(tour)],
        comparator: "number_equal",
        explanation: expl(`${d} × 3,14 = ${fr(tour)} cm.`),
        canvas: tableauTour([1, d], 1),
      };
    },
  },

  // =========================
  // CERCLE_PERIMETRE
  // =========================
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la formule du périmètre d’un disque de diamètre d ?",
    format: "qcm",
    choices: ["P = π × d", "P = 2 × d", "P = π × d × d", "P = d ÷ π"],
    expected: ["P = π × d"],
    comparator: "mcq_exact",
    hint: "Le tour vaut π fois le diamètre.",
    explanation: expl(
      "P = π × d. Comme le diamètre vaut deux rayons, on peut aussi écrire P = 2 × π × r."
    ),
    tags: ["cercle_disque", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule donne le périmètre d’un disque à partir de son RAYON r ?",
    format: "qcm",
    choices: ["P = 2 × π × r", "P = π × r", "P = π × r × r", "P = 4 × r"],
    expected: ["P = 2 × π × r"],
    comparator: "mcq_exact",
    hint: "Il faut d’abord passer du rayon au diamètre.",
    explanation: expl(
      "d = 2 × r, donc P = π × d = π × 2 × r = 2 × π × r. Écrire P = π × r reviendrait à oublier la moitié du tour."
    ),
    tags: ["cercle_disque", "formule", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Un disque a un diamètre de 10 cm. Calcule son périmètre (π ≈ 3,14).",
    format: "short",
    expected: ["31,4", "31.4", "31,4 cm"],
    comparator: "number_equal",
    hint: "P = π × d.",
    explanation: expl("P = π × d = 3,14 × 10 = 31,4 cm."),
    tags: ["cercle_disque", "calcul", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Calcule le périmètre de ce disque (π ≈ 3,14).",
    format: "short",
    expected: ["18,84", "18.84", "18,84 cm"],
    comparator: "number_equal",
    hint: "La figure donne le diamètre : P = π × d.",
    explanation: expl("P = π × d = 3,14 × 6 = 18,84 cm."),
    tags: ["cercle_disque", "calcul", "canvas"],
    canvas: cercleAvec("diametre", "6 cm"),
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Observe la figure : c’est le RAYON qui est donné. Calcule le périmètre (π ≈ 3,14).",
    format: "short",
    expected: ["31,4", "31.4", "31,4 cm"],
    comparator: "number_equal",
    hint: "Passe d’abord au diamètre : d = 2 × 5.",
    explanation: expl(
      "d = 2 × r = 2 × 5 = 10 cm, puis P = π × d = 3,14 × 10 = 31,4 cm. (Multiplier 3,14 par 5 donnerait 15,7 : la moitié du tour.)"
    ),
    tags: ["cercle_disque", "calcul", "canvas"],
    canvas: cercleAvec("rayon", "5 cm"),
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Un disque a un périmètre de 31,4 cm. Quel est son diamètre (π ≈ 3,14) ?",
    format: "short",
    expected: ["10", "10 cm"],
    comparator: "number_equal",
    hint: "On fait le calcul à l’envers : d = P ÷ π.",
    explanation: expl("d = P ÷ π = 31,4 ÷ 3,14 = 10 cm. Vérification : 3,14 × 10 = 31,4 cm."),
    tags: ["cercle_disque", "calcul", "short"],
  },
  {
    kind: "fixed",
    id: "cercle_perimetre_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    text: "Un rond-point a un diamètre de 20 m. Quelle longueur parcourt-on en en faisant tout le tour (π ≈ 3,14) ?",
    format: "short",
    expected: ["62,8", "62.8", "62,8 m"],
    comparator: "number_equal",
    hint: "Faire le tour, c’est parcourir le périmètre.",
    explanation: expl("P = π × d = 3,14 × 20 = 62,8 m."),
    tags: ["cercle_disque", "probleme", "short"],
  },
  {
    kind: "template",
    id: "cercle_perimetre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 2,
    theme: "neutral",
    hint: "P = π × d, avec π ≈ 3,14.",
    tags: ["cercle_disque", "calcul", "template"],
    generate: () => {
      const d = randomInt(2, 20);
      const p = Number((d * 3.14).toFixed(2));
      const fr = (x: number) => String(x).replace(".", ",");
      return {
        text: `Un disque a un diamètre de ${d} cm. Calcule son périmètre (π ≈ 3,14).`,
        format: "short",
        expected: [fr(p), String(p)],
        comparator: "number_equal",
        explanation: expl(`P = π × d = 3,14 × ${d} = ${fr(p)} cm.`),
        canvas: cercleAvec("diametre", `${d} cm`),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_perimetre_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_perimetre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rayon d’abord, le diamètre ensuite : d = 2 × r.",
    tags: ["cercle_disque", "calcul", "template"],
    generate: () => {
      const r = randomInt(2, 12);
      const p = Number((2 * r * 3.14).toFixed(2));
      const fr = (x: number) => String(x).replace(".", ",");
      return {
        text: `Un disque a un rayon de ${r} cm. Calcule son périmètre (π ≈ 3,14).`,
        format: "short",
        expected: [fr(p), String(p)],
        comparator: "number_equal",
        explanation: expl(
          `d = 2 × ${r} = ${2 * r} cm, puis P = π × d = 3,14 × ${2 * r} = ${fr(p)} cm.`
        ),
        canvas: cercleAvec("rayon", `${r} cm`),
      };
    },
  },

  // =========================
  // CERCLE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "cercle_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Une roue de vélo a un diamètre de 70 cm. Quelle distance parcourt le vélo en un tour de roue (π ≈ 3,14) ?",
    format: "short",
    expected: ["219,8", "219.8", "219,8 cm"],
    comparator: "number_equal",
    hint: "Un tour de roue = le périmètre de la roue.",
    explanation: expl(
      "P = π × d = 3,14 × 70 = 219,8 cm, soit environ 2,20 m à chaque tour de roue."
    ),
    tags: ["cercle_disque", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi utilise-t-on 3,14 et pas exactement 3 pour calculer un tour de disque ?",
    format: "qcm",
    choices: [
      "parce que le tour vaut un peu plus de 3 diamètres",
      "parce que le tour vaut exactement 3 diamètres",
      "parce que 3,14 est plus facile à multiplier",
      "parce que 3,14 dépend de la taille du disque",
    ],
    expected: ["parce que le tour vaut un peu plus de 3 diamètres"],
    comparator: "mcq_exact",
    hint: "Enroule une ficelle autour d’une boîte ronde, puis compare-la au diamètre.",
    explanation: expl(
      "En reportant le diamètre le long du tour, on en place 3 et il reste un petit morceau. Ce « 3 et un peu » est le nombre π, environ 3,14 — le même pour tous les disques."
    ),
    tags: ["cercle_disque", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on calculer le périmètre d’un disque si l’on connaît seulement son rayon ?",
    format: "qcm",
    choices: [
      "oui, car le diamètre se déduit du rayon",
      "non, il faut absolument mesurer le diamètre",
      "non, il faut aussi connaître l’aire",
      "oui, mais seulement si le rayon est un nombre entier",
    ],
    expected: ["oui, car le diamètre se déduit du rayon"],
    comparator: "mcq_exact",
    hint: "d = 2 × r.",
    explanation: expl(
      "Le rayon suffit : d = 2 × r, donc P = 2 × π × r. Un seul des deux, rayon ou diamètre, suffit toujours."
    ),
    tags: ["cercle_disque", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "À La Réunion, un bassin rond a un tour de 15,7 m. Quel est son rayon (π ≈ 3,14) ?",
    format: "short",
    expected: ["2,5", "2.5", "2,5 m"],
    comparator: "number_equal",
    hint: "Trouve d’abord le diamètre : d = P ÷ π.",
    explanation: expl(
      "d = 15,7 ÷ 3,14 = 5 m, puis r = 5 ÷ 2 = 2,5 m. Le rayon du bassin mesure 2,5 m."
    ),
    tags: ["cercle_disque", "defi", "probleme"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une piste est formée d’un carré de côté 10 m dont on a remplacé un côté par un demi-cercle de diamètre 10 m. Quel est le périmètre de la piste (π ≈ 3,14) ?",
    format: "short",
    expected: ["45,7", "45.7", "45,7 m"],
    comparator: "number_equal",
    hint: "Trois côtés droits, plus la moitié du tour d’un disque de diamètre 10 m.",
    explanation: expl(
      "Les trois côtés droits donnent 3 × 10 = 30 m. Le demi-cercle vaut la moitié du tour : (3,14 × 10) ÷ 2 = 31,4 ÷ 2 = 15,7 m. Périmètre total : 30 + 15,7 = 45,7 m."
    ),
    tags: ["cercle_disque", "defi", "figure_composee"],
  },
  {
    kind: "fixed",
    id: "cercle_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi deux disques de diamètres différents ont toujours le même quotient tour ÷ diamètre.",
    format: "short",
    expected: ["proportionnel", "π", "pi", "coefficient"],
    comparator: "contains_keyword",
    hint: "Le tour et le diamètre grandissent ensemble, dans le même rapport.",
    explanation: expl(
      "Le tour d’un disque est proportionnel à son diamètre : quand on multiplie le diamètre par un nombre, le tour est multiplié par le même nombre. Le quotient tour ÷ diamètre ne change donc jamais — c’est le coefficient de proportionnalité, le nombre π ≈ 3,14."
    ),
    tags: ["cercle_disque", "defi", "raisonnement"],
  },
  // ⭐ LES DÉFIS AUSSI ONT LEUR GÉNÉRATEUR (règle d'or : dix variantes minimum
  // par micro, sinon l'élève retombe sur la même question en dix minutes).
  {
    kind: "template",
    id: "cercle_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Un tour complet, c'est le périmètre du disque.",
    tags: ["cercle_disque", "defi", "template"],
    generate: () => {
      const objets = [
        { nom: "une roue de vélo", d: randomInt(60, 75), unite: "cm" },
        { nom: "une roue de trottinette", d: randomInt(15, 25), unite: "cm" },
        { nom: "un rond-point", d: randomInt(15, 30), unite: "m" },
        { nom: "un bassin rond", d: randomInt(4, 12), unite: "m" },
      ];
      const o = objets[randomInt(0, objets.length - 1)];
      const p = Number((o.d * 3.14).toFixed(2));
      const fr = (x: number) => String(x).replace(".", ",");
      return {
        text: `${o.nom.charAt(0).toUpperCase()}${o.nom.slice(1)} a un diamètre de ${o.d} ${o.unite}. Quelle distance parcourt-on en en faisant tout le tour (π ≈ 3,14) ?`,
        format: "short",
        expected: [fr(p), String(p)],
        comparator: "number_equal",
        explanation: expl(
          `Faire le tour, c'est parcourir le périmètre : P = π × d = 3,14 × ${o.d} = ${fr(p)} ${o.unite}.`
        ),
        canvas: cercleAvec("diametre", `${o.d} ${o.unite}`),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_defi_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis ce que π représente, et d'où vient sa valeur.",
    tags: ["cercle_disque", "defi", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique pourquoi le nombre π est le même pour tous les disques, grands ou petits.",
          mots: ["proportionnel", "rapport", "quotient", "coefficient"],
          r: "Le tour d'un disque est proportionnel à son diamètre : si on multiplie le diamètre par un nombre, le tour est multiplié par le même nombre. Le quotient tour ÷ diamètre ne change donc jamais — c'est ce coefficient qu'on appelle π.",
        },
        {
          q: "Explique comment on peut mesurer π avec une ficelle et une règle.",
          mots: ["ficelle", "enrouler", "diviser", "diamètre", "diametre"],
          r: "On enroule une ficelle autour d'un objet rond, on la déroule et on mesure sa longueur : c'est le périmètre. On mesure ensuite le diamètre, puis on divise le périmètre par le diamètre. On trouve toujours un nombre proche de 3,14, quel que soit l'objet.",
        },
        {
          q: "Explique pourquoi la formule P = 2 × π × R donne le même résultat que P = π × D.",
          mots: ["diamètre", "diametre", "deux", "rayon", "double"],
          r: "Le diamètre vaut deux rayons : D = 2 × R. En remplaçant D par 2 × R dans P = π × D, on obtient P = π × 2 × R, c'est-à-dire 2 × π × R. Les deux formules disent la même chose.",
        },
        {
          q: "Un élève calcule le périmètre d'un disque de rayon 5 cm et trouve 15,7 cm. Explique son erreur.",
          mots: ["rayon", "diamètre", "diametre", "moitié", "moitie", "double"],
          r: "Il a multiplié 3,14 par le RAYON au lieu du diamètre : il a trouvé la moitié du tour. Le diamètre vaut 2 × 5 = 10 cm, donc P = 3,14 × 10 = 31,4 cm.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CERCLE_ENSEMBLE — le cercle et le disque comme ENSEMBLES DE POINTS
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-G-cercles-2) : « comprendre
  // la définition d'un cercle et celle d'un disque sous la forme d'ensembles de
  // points ». Le BO l'écrit ainsi : « le cercle de centre O et de rayon 2 cm est
  // l'ensemble des points situés à 2 cm de O ».
  //
  // ⭐ CE N'EST PAS DU VOCABULAIRE EN PLUS, C'EST UN CHANGEMENT DE NATURE. Tant
  // qu'on le dessine au compas, le cercle est une FORME — un rond. La définition
  // par ensemble de points en fait un CRITÈRE : pour savoir si un point est
  // dessus, on ne regarde plus le dessin, on mesure sa distance au centre. C'est
  // ce basculement qui rend possibles la médiatrice, le cercle circonscrit et
  // toute la géométrie de 5e.
  //
  // ⚠️ CERCLE ET DISQUE SE DISTINGUENT ICI, ET NULLE PART AILLEURS : le cercle
  // est l'ensemble des points situés à EXACTEMENT r du centre — le tour seul ;
  // le disque, ceux situés à AU PLUS r — le tour et tout l'intérieur. Confondre
  // les deux est l'erreur du chapitre, et elle a ses items.
  //
  // ⚠️ LA CORDE EST TRAITÉE ICI AUSSI. L'objectif 6e-G-cercles-1 la réclame
  // (« connaître les définitions d'un cercle, d'un disque, d'un rayon, d'un
  // diamètre, d'une CORDE ») et `cercle_vocabulaire` s'arrêtait au diamètre.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Le cercle de centre O et de rayon 3 cm, c'est l'ensemble des points situés…",
    format: "qcm",
    choices: [
      "à exactement 3 cm de O",
      "à 3 cm au plus de O",
      "à 3 cm au moins de O",
      "à exactement 6 cm de O",
    ],
    expected: ["à exactement 3 cm de O"],
    comparator: "mcq_exact",
    hint: "Le cercle est le tour seul, pas ce qu'il y a dedans.",
    explanation: expl(
      "Le cercle de centre O et de rayon 3 cm est l'ensemble des points situés à EXACTEMENT 3 cm de O : ni plus près, ni plus loin. « À 3 cm au plus » décrirait le DISQUE, qui comprend l'intérieur ; « à 3 cm au moins » décrirait tout l'extérieur ; et 6 cm est le diamètre, pas le rayon."
    ),
    tags: ["cercle_disque", "ensemble", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre le cercle et le disque de centre O et de rayon 4 cm ?",
    format: "qcm",
    choices: [
      "le cercle est le tour seul, le disque comprend aussi l'intérieur",
      "le disque est le tour seul, le cercle comprend aussi l'intérieur",
      "il n'y en a aucune, ce sont deux mots pour la même chose",
      "le disque a un rayon deux fois plus grand",
    ],
    expected: ["le cercle est le tour seul, le disque comprend aussi l'intérieur"],
    comparator: "mcq_exact",
    hint: "Pense à une pièce de monnaie et à son contour.",
    explanation: expl(
      "Le cercle est l'ensemble des points à exactement 4 cm de O : c'est une ligne, le tour. Le disque est l'ensemble des points à 4 cm AU PLUS de O : c'est une surface, le tour ET tout l'intérieur. Une pièce de monnaie est un disque ; le trait qu'on dessine autour est un cercle. C'est pour cela qu'on parle du PÉRIMÈTRE du disque et de l'AIRE du disque, mais jamais de l'aire d'un cercle."
    ),
    tags: ["cercle_disque", "ensemble", "piege", "canvas", "qcm"],
    canvas: cercleDesPoints([], { disque: true }),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 2,
    theme: "neutral",
    text: "Un point M vérifie OM = 5 cm. Le cercle de centre O et de rayon 5 cm passe-t-il par M ?",
    format: "qcm",
    choices: [
      "oui, car M est à exactement 5 cm de O",
      "non, il faudrait connaître la position de M",
      "non, car M pourrait être à l'intérieur",
      "seulement si M est sur un rayon tracé",
    ],
    expected: ["oui, car M est à exactement 5 cm de O"],
    comparator: "mcq_exact",
    hint: "La seule chose qui compte est la distance à O.",
    explanation: expl(
      "Oui. Appartenir au cercle de centre O et de rayon 5 cm, c'est exactement être à 5 cm de O — rien d'autre n'est demandé. Peu importe la direction dans laquelle se trouve M : il y a une infinité de points à 5 cm de O, et ils forment justement ce cercle. C'est toute la force de la définition par ensemble de points : elle donne un CRITÈRE qu'on peut vérifier au compas, sans regarder le dessin."
    ),
    tags: ["cercle_disque", "ensemble", "canvas", "qcm"],
    canvas: cercleDesPoints([{ id: "M", distance: 1, angle: 55, highlight: true }]),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 4,
    theme: "neutral",
    text: "On considère le disque de centre O et de rayon 5 cm. Où se trouve le point N tel que ON = 4 cm ?",
    format: "qcm",
    choices: [
      "à l'intérieur du disque, mais pas sur le cercle",
      "sur le cercle",
      "à l'extérieur du disque",
      "au centre du disque",
    ],
    expected: ["à l'intérieur du disque, mais pas sur le cercle"],
    comparator: "mcq_exact",
    hint: "Compare 4 cm au rayon 5 cm.",
    explanation: expl(
      "4 cm est plus petit que 5 cm : N est donc à moins de 5 cm de O. Il appartient bien au disque, qui rassemble tous les points à 5 cm AU PLUS, mais pas au cercle, qui exige exactement 5 cm. N n'est pas non plus au centre, ce qui demanderait ON = 0."
    ),
    tags: ["cercle_disque", "ensemble", "canvas", "qcm"],
    canvas: cercleDesPoints([{ id: "N", distance: 0.62, angle: 120, highlight: true }], {
      disque: true,
    }),
  },
  {
    kind: "fixed",
    id: "cercle_ensemble_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    text: "Sur la figure, [AB] joint deux points du cercle sans passer par le centre O. Comment appelle-t-on ce segment ?",
    format: "qcm",
    choices: ["une corde", "un diamètre", "un rayon", "un arc"],
    expected: ["une corde"],
    comparator: "mcq_exact",
    hint: "Un diamètre passerait par O ; un arc serait courbe.",
    explanation: expl(
      "Un segment qui joint deux points d'un cercle s'appelle une CORDE. Le diamètre est la corde particulière qui passe par le centre — c'est la plus longue de toutes. L'arc, lui, n'est pas un segment : c'est la portion de cercle entre les deux points, donc une ligne courbe. Et le rayon joint le centre à un point du cercle."
    ),
    tags: ["cercle_disque", "ensemble", "corde", "canvas", "qcm"],
    canvas: cercleAvecCorde(),
  },
  {
    kind: "template",
    id: "cercle_ensemble_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la distance donnée au rayon.",
    tags: ["cercle_disque", "ensemble", "template"],
    generate: () => {
      const rayon = randomInt(3, 9);
      const cas = randomInt(0, 2);
      const distance = cas === 0 ? rayon : cas === 1 ? randomInt(1, rayon - 1) : rayon + randomInt(1, 4);
      const bonne =
        cas === 0
          ? "sur le cercle"
          : cas === 1
            ? "à l'intérieur du disque, mais pas sur le cercle"
            : "à l'extérieur du disque";

      return {
        text: `Un cercle a pour centre O et pour rayon ${rayon} cm. Un point P vérifie OP = ${distance} cm. Où se trouve P ?`,
        format: "qcm",
        choices: [
          "sur le cercle",
          "à l'intérieur du disque, mais pas sur le cercle",
          "à l'extérieur du disque",
          "au centre du cercle",
        ],
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `On compare la distance au rayon : ${distance} cm ${
            cas === 0
              ? `est égal au rayon ${rayon} cm, donc P est à exactement ${rayon} cm de O : il est SUR le cercle`
              : cas === 1
                ? `est plus petit que le rayon ${rayon} cm, donc P est trop près de O pour être sur le cercle : il est à l'intérieur du disque`
                : `est plus grand que le rayon ${rayon} cm, donc P est trop loin de O : il est à l'extérieur du disque`
          }. Seule la distance à O compte, jamais la direction.`
        ),
        canvas: cercleDesPoints(
          [{ id: "P", distance: distance / rayon, angle: randomInt(20, 160), highlight: true }],
          { disque: cas !== 0 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_ensemble_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_ensemble",
    difficulty: 5,
    theme: "neutral",
    hint: "Parle de DISTANCE au centre, pas de forme.",
    tags: ["cercle_disque", "ensemble", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Explique ce que veut dire « le cercle de centre O et de rayon 2 cm est l'ensemble des points situés à 2 cm de O ».",
          mots: ["distance", "exactement", "tous", "2 cm", "infinité", "infinite", "critère", "critere"],
          r: "Cela veut dire que le cercle n'est pas d'abord une forme, mais une COLLECTION : celle de tous les points qui sont à exactement 2 cm de O, et d'eux seuls. Il y en a une infinité, dans toutes les directions autour de O, et mis bout à bout ils dessinent le rond qu'on connaît. L'intérêt est qu'on obtient un critère : pour savoir si un point appartient au cercle, on mesure sa distance à O, sans avoir besoin du dessin.",
        },
        {
          q: "Explique la différence entre le cercle et le disque, et donne un exemple de la vie courante.",
          mots: ["tour", "intérieur", "interieur", "au plus", "exactement", "surface", "ligne"],
          r: "Le cercle est l'ensemble des points situés à exactement r du centre : c'est une ligne, le tour. Le disque est l'ensemble des points situés à r AU PLUS : c'est une surface, le tour et tout ce qu'il y a dedans. Une pièce de monnaie est un disque, le trait qu'on dessine en en faisant le tour est un cercle. C'est pour cela qu'on calcule le périmètre d'un disque et son aire, mais jamais l'aire d'un cercle : une ligne n'a pas d'aire.",
        },
        {
          q: "Pourquoi la définition du cercle par ensemble de points est-elle plus utile que « un rond tracé au compas » ?",
          mots: ["vérifier", "verifier", "distance", "critère", "critere", "sans dessin", "démontrer", "demontrer"],
          r: "Parce qu'elle permet de DÉCIDER. Avec « un rond », on ne peut que regarder et estimer ; avec « les points à 2 cm de O », on mesure et on tranche, même sans dessin soigné. C'est ce qui permet ensuite de démontrer : dire qu'un point est sur un cercle devient une affirmation sur une longueur, qu'on peut justifier. Le compas, d'ailleurs, ne fait rien d'autre que garder une distance constante — il applique la définition.",
        },
        {
          q: "Un élève dit qu'un point situé à 7 cm du centre d'un cercle de rayon 7 cm « est peut-être dedans, ça dépend où ». Explique son erreur.",
          mots: ["direction", "distance", "toutes", "sur le cercle", "peu importe", "infinité", "infinite"],
          r: "Il croit que la position dépend de la direction, alors que seule la DISTANCE au centre compte. Tous les points à 7 cm de O — quelle que soit la direction — sont sur le cercle de rayon 7 cm : ils sont même une infinité, et c'est précisément eux qui le forment. Un point n'est à l'intérieur que si sa distance est plus PETITE que le rayon.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CERCLE_DISTANCE — les problèmes de distances à un point
  //
  // ⛔ OUVERTE LE 23/08/2026 — TROU DU PROGRAMME (6e-G-cercles-3) : « résoudre
  // des problèmes mettant en jeu des distances à un point ». L'exemple de
  // réussite du BO est la chèvre attachée à une corde de 8 m, dont on demande de
  // hachurer la zone de broutage.
  //
  // ⭐ C'EST LA DÉFINITION PRÉCÉDENTE, MISE AU TRAVAIL. « Les points à moins de
  // 8 m du piquet » n'a l'air de rien tant qu'on ne l'a pas reconnu : c'est un
  // DISQUE de rayon 8 m. Le chapitre sert à ça — traduire une contrainte de
  // distance en une figure, puis lire la réponse sur la figure.
  //
  // ⚠️ LA CORDE DONNE UN DISQUE, PAS UN CERCLE : la chèvre peut brouter partout
  // où la corde n'est pas tendue, donc à 8 m AU PLUS. Répondre « un cercle »,
  // c'est ne lui laisser que le tour — l'erreur exacte que le BO vise.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    kind: "fixed",
    id: "cercle_distance_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Une chèvre est attachée à un piquet par une corde de 8 m, dans un pré tout plat. Quelle est la forme de la zone où elle peut brouter ?",
    format: "qcm",
    choices: [
      "un disque de rayon 8 m",
      "un cercle de rayon 8 m",
      "un disque de rayon 16 m",
      "un carré de 8 m de côté",
    ],
    expected: ["un disque de rayon 8 m"],
    comparator: "mcq_exact",
    hint: "La corde peut aussi être détendue.",
    explanation: expl(
      "La chèvre peut aller partout où sa distance au piquet ne dépasse pas 8 m — corde tendue, mais aussi corde détendue. La zone est donc l'ensemble des points situés à 8 m AU PLUS du piquet : un DISQUE de rayon 8 m. Répondre « un cercle » ne lui laisserait que le tour, corde toujours tendue, ce qui n'a aucun sens pour brouter. Et 16 m serait le diamètre, pas le rayon."
    ),
    tags: ["cercle_disque", "distance", "piege", "canvas", "qcm"],
    canvas: cercleDesPoints([], { disque: true }),
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Même chèvre, même corde de 8 m. Un arbre se trouve à 9 m du piquet. Peut-elle l'atteindre ?",
    format: "qcm",
    choices: [
      "non, car 9 m dépasse la longueur de la corde",
      "oui, si elle tire bien sur la corde",
      "oui, car 9 m est proche de 8 m",
      "on ne peut pas savoir sans connaître la direction",
    ],
    expected: ["non, car 9 m dépasse la longueur de la corde"],
    comparator: "mcq_exact",
    hint: "Compare 9 m au rayon de la zone.",
    explanation: expl(
      "La zone de broutage est le disque de rayon 8 m. L'arbre est à 9 m, donc plus loin que 8 m : il est en dehors du disque, et la chèvre ne peut pas l'atteindre. La direction n'y change rien — la contrainte ne porte que sur la distance au piquet."
    ),
    tags: ["cercle_disque", "distance", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 5,
    theme: "neutral",
    text: "On cherche les points situés à la fois à 3 cm du point A et à 4 cm du point B, avec AB = 5 cm. Combien y en a-t-il ?",
    format: "qcm",
    choices: ["2", "1", "aucun", "une infinité"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Trace les deux cercles : où se coupent-ils ?",
    explanation: expl(
      "Les points à 3 cm de A forment le cercle de centre A et de rayon 3 cm ; ceux à 4 cm de B, le cercle de centre B et de rayon 4 cm. Les points cherchés sont sur les DEUX : ce sont les points d'intersection des deux cercles. Comme 5 cm est plus petit que 3 + 4 = 7 cm et plus grand que 4 − 3 = 1 cm, les cercles se coupent en DEUX points. C'est exactement la méthode pour construire un triangle dont on connaît les trois côtés."
    ),
    tags: ["cercle_disque", "distance", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "cercle_distance_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 4,
    theme: "reunion",
    text: "Une borne de secours couvre tout ce qui est à moins de 500 m d'elle. Une case est à 500 m exactement. Est-elle couverte ?",
    format: "qcm",
    choices: [
      "non : « à moins de 500 m » exclut la distance 500 m elle-même",
      "oui, car 500 m est la portée annoncée",
      "oui, car la borne couvre un disque de rayon 500 m",
      "on ne peut pas savoir sans connaître la direction",
    ],
    expected: ["non : « à moins de 500 m » exclut la distance 500 m elle-même"],
    comparator: "mcq_exact",
    hint: "Lis très précisément : « à moins de » ou « à 500 m au plus » ?",
    explanation: expl(
      "« À moins de 500 m » veut dire strictement moins : la case, qui est à 500 m tout juste, n'est pas couverte. Si l'énoncé avait dit « à 500 m au plus », elle l'aurait été. En géométrie comme en droit, la frontière appartient à l'un ou à l'autre selon la formulation — c'est la différence entre le disque avec son bord et le disque sans son bord."
    ),
    tags: ["cercle_disque", "distance", "974", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cercle_distance_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis la contrainte de distance en disque, puis compare.",
    tags: ["cercle_disque", "distance", "template"],
    generate: () => {
      const portee = randomInt(4, 20);
      const objets = [
        { quoi: "un arroseur", verbe: "arroser", lieu: "un massif" },
        { quoi: "une lampe", verbe: "éclairer", lieu: "un banc" },
        { quoi: "une borne wifi", verbe: "couvrir", lieu: "une salle" },
        { quoi: "un chien attaché", verbe: "atteindre", lieu: "une gamelle" },
      ];
      const o = objets[randomInt(0, objets.length - 1)];
      const dedans = Math.random() < 0.5;
      const distance = dedans ? randomInt(1, portee - 1) : portee + randomInt(1, 6);

      return {
        text: `${o.quoi.charAt(0).toUpperCase()}${o.quoi.slice(1)} placé en O peut ${o.verbe} tout ce qui se trouve à ${portee} m au plus. ${o.lieu.charAt(0).toUpperCase()}${o.lieu.slice(1)} est à ${distance} m de O. Est-il concerné ?`,
        format: "qcm",
        choices: [
          "oui, il est dans le disque de rayon " + portee + " m",
          "non, il est en dehors du disque de rayon " + portee + " m",
          "oui, mais seulement s'il est dans la bonne direction",
          "on ne peut pas répondre sans connaître la forme du terrain",
        ],
        expected: [
          dedans
            ? "oui, il est dans le disque de rayon " + portee + " m"
            : "non, il est en dehors du disque de rayon " + portee + " m",
        ],
        comparator: "mcq_exact",
        explanation: expl(
          `La zone concernée est l'ensemble des points situés à ${portee} m au plus de O : c'est le disque de centre O et de rayon ${portee} m. On compare donc ${distance} m à ${portee} m — ${distance} m est ${
            dedans ? "plus petit" : "plus grand"
          }, donc le point est ${dedans ? "dans" : "hors de"} la zone. La direction n'intervient jamais : seule la distance à O compte.`
        ),
        canvas: cercleDesPoints(
          [{ id: "M", distance: distance / portee, angle: randomInt(20, 160), highlight: true }],
          { disque: true }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cercle_distance_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_disque",
    microId: "cercle_distance",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis d'abord quelle FIGURE traduit la contrainte, ensuite conclus.",
    tags: ["cercle_disque", "distance", "template", "ouverte"],
    generate: () => {
      const cas = [
        {
          q: "Une chèvre est attachée à un piquet par une corde de 8 m. Explique quelle zone elle peut brouter, et pourquoi ce n'est pas un cercle.",
          mots: ["disque", "au plus", "détendue", "detendue", "intérieur", "interieur", "8"],
          r: "Elle peut aller partout où sa distance au piquet ne dépasse pas 8 m. Corde tendue, elle décrit le cercle de rayon 8 m ; mais rien ne l'oblige à tendre la corde, et elle broute aussi tout ce qui est plus près. La zone est donc le DISQUE de rayon 8 m — le tour et tout l'intérieur. Répondre « un cercle » reviendrait à la faire brouter uniquement sur une ligne.",
        },
        {
          q: "Explique comment trouver les points situés à la fois à 3 cm de A et à 4 cm de B.",
          mots: ["deux cercles", "intersection", "coupent", "compas", "deux points"],
          r: "On trace le cercle de centre A et de rayon 3 cm : il contient tous les points qui remplissent la première condition. Puis le cercle de centre B et de rayon 4 cm, pour la seconde. Les points cherchés doivent remplir les deux, ils sont donc à l'intersection : là où les deux cercles se coupent, ce qui donne en général deux points. C'est exactement ce qu'on fait au compas pour construire un triangle dont on connaît les trois longueurs.",
        },
        {
          q: "Pourquoi la direction ne joue-t-elle aucun rôle dans ces problèmes de distance à un point ?",
          mots: ["distance", "seule", "toutes les directions", "symétrie", "symetrie", "rond"],
          r: "Parce que la contrainte ne porte que sur une longueur : « à moins de 8 m du piquet » ne dit rien du nord ni du sud. Toutes les directions sont donc traitées de la même façon, et c'est précisément ce qui rend la zone ronde. Si la corde était gênée par un mur, la zone cesserait d'être un disque — c'est le signe que la symétrie venait bien de l'absence de contrainte de direction.",
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: expl(c.r),
      };
    },
  },
];
