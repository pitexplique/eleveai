// lib/tutor-v4/questionBank/4e/maths/echelles.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `prop_echelle`, agrandissement, réduction et
// échelles. Elle ferme DEUX trous du BO et complète DEUX partiels — le meilleur
// rapport de tout ce qui restait au programme de 4e :
//   · 4e-C-transformations-2 « Utiliser un rapport de réduction ou
//     d'agrandissement (architecture, maquettes) pour calculer des longueurs,
//     des aires, des volumes » ;
//   · 4e-C-transformations-3 « Utiliser l'échelle d'une carte » ;
//   · 4e-C-transformations-1, dont l'effet sur les aires et les volumes
//     manquait ; 4e-B-proportionnalite-8, qui n'avait que les pourcentages.
//
// ⭐ TROIS MICROS RÉACTIVENT LA 6e, avec ses identifiants exacts
// (`echelle_comprendre`, `echelle_distance_reelle`, `echelle_distance_plan`).
// ⛔ Frédéric, 28/08 : « on garde le rappel de 6e ». Renvoyer un élève de 4e
// vers une fiche de 6e serait un jugement ; le moteur d'étoiles fait le tri
// sans rien dire à personne. Les ÉNONCÉS, eux, sont de 4e : cartes IGN,
// maquettes d'architecte, plans de terrain — pas le plan de la salle de classe.
//
// ⭐ ET LE SAUT DE LA 4e TIENT EN UNE PHRASE, déroulée sur trois micros : les
// LONGUEURS sont multipliées par k, donc les AIRES par k², donc les VOLUMES par
// k³. Le k² est le plus cher à admettre — c'est là que les items insistent, et
// c'est le seul endroit où l'on pose un dessin qui se compte.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS PARTICULIÈRES :
// le sens d'une échelle inférieure à 1 (une réduction), et le cas emblématique
// k = 2 où l'aire quadruple — celui-là se montre, il ne se calcule pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  EchelleCanvasData,
  FigureLibreCanvasData,
  TableauDonneesCanvasData,
} from "@/lib/tutor-v4/types_canvas";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** 1500 → « 1 500 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return Number.isInteger(n)
    ? n.toLocaleString("fr-FR").replace(/[  ]/g, " ")
    : String(n).replace(".", ",");
}

// ⭐ LA TABLE DES ÉCHELLES, écrite à la main plutôt que tirée au hasard : chaque
// ligne donne une correspondance JUSTE et LISIBLE pour 1 cm sur le plan. Un
// tirage libre du dénominateur produirait « 1 cm pour 3,7 m », qui n'existe sur
// aucune carte et n'apprend rien.
const ECHELLES = [
  { d: 100, reel: "1 m", cm: 100, contexte: "un plan d'appartement" },
  { d: 200, reel: "2 m", cm: 200, contexte: "un plan de maison" },
  { d: 500, reel: "5 m", cm: 500, contexte: "un plan de terrain" },
  { d: 1000, reel: "10 m", cm: 1000, contexte: "un plan de quartier" },
  { d: 2000, reel: "20 m", cm: 2000, contexte: "un plan de lotissement" },
  { d: 5000, reel: "50 m", cm: 5000, contexte: "un plan de ville" },
  { d: 10000, reel: "100 m", cm: 10000, contexte: "une carte de randonnée" },
  { d: 25000, reel: "250 m", cm: 25000, contexte: "une carte IGN" },
  { d: 50000, reel: "500 m", cm: 50000, contexte: "une carte routière" },
  { d: 100000, reel: "1 km", cm: 100000, contexte: "une carte départementale" },
] as const;

function canvasEchelle(params: {
  variant: EchelleCanvasData["variant"];
  echelle?: string;
  plan?: string;
  reel?: string;
  question?: string;
}): EchelleCanvasData {
  return {
    kind: "echelle",
    variant: params.variant,
    echelleLabel: params.echelle,
    planLabel: "sur le plan",
    reelLabel: "dans la réalité",
    planDistance: params.plan,
    reelDistance: params.reel,
    questionLabel: params.question,
    display: {
      showEchelle: true,
      showLabels: true,
      showQuestion: Boolean(params.question),
    },
    size: { width: 300, height: 200 },
  };
}

function tableau(
  headers: string[],
  rows: { values: (string | number)[] }[],
  caption?: string,
  highlight?: { row?: number; col?: number }
): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    headers,
    rows,
    caption,
    highlight,
    display: { compact: true, striped: true },
  };
}

// ⭐ LE DESSIN QUI FAIT ADMETTRE LE k². Un carré de côté 2 tient dans un carré
// de côté 4 exactement QUATRE fois — on les compte, on ne les calcule pas.
// C'est le seul argument qui tienne devant l'intuition « ×2 partout ».
const CARRE_4 = Array.from({ length: 4 }, (_, r) =>
  Array.from({ length: 4 }, (_, c) => [r, c] as [number, number])
).flat();

const carreDouble: FigureLibreCanvasData = {
  kind: "figure_libre",
  grid: { rows: 4, cols: 4, filledCells: CARRE_4 },
  display: { showGrid: true, showFilled: true, showPerimeter: true },
  colors: { filled: "#dbeafe", grid: "#94a3b8", perimeter: "#2563eb" },
  size: { cellSize: 34, padding: 16 },
};

export const echellesBank: TutorBankItemV4[] = [
  /* =========================================================================
     ECHELLE_COMPRENDRE — réactivation de la 6e, énoncés de 4e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_echelle_comprendre_tpl_1_lire",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le dénominateur dit combien de centimètres réels valent 1 cm du plan.",
    tags: ["echelle", "lire", "qcm", "template", "canvas"],
    generate: () => {
      const e = randomChoice(ECHELLES);
      return {
        text: `Sur ${e.contexte} à l'échelle 1/${fr(e.d)}, que représente 1 cm ?`,
        format: "qcm",
        choices: makeChoices(e.reel, [
          ...ECHELLES.filter((x) => x.reel !== e.reel)
            .slice(0, 6)
            .map((x) => x.reel),
        ]),
        expected: [e.reel],
        comparator: "mcq_exact",
        explanation:
          "Définition : une échelle 1/d signifie que 1 unité sur le plan représente d unités dans la réalité — les DEUX dans la même unité.\n\n" +
          `Méthode : 1 cm sur le plan vaut donc ${fr(e.d)} cm en vrai, qu'on convertit ensuite.\n\n` +
          `Calcul : ${fr(e.cm)} cm = ${e.reel}.\n\n` +
          `Conclusion : sur cette carte, 1 cm représente ${e.reel}.`,
        canvas: canvasEchelle({
          variant: "correspondance",
          echelle: `1/${fr(e.d)}`,
          plan: "1 cm",
          reel: "?",
          question: `1 cm sur le plan, combien en vrai ?`,
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_comprendre_tpl_2_comparer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Plus le dénominateur est GRAND, plus la carte montre grand… ou petit ?",
    tags: ["echelle", "comparer", "qcm", "template"],
    generate: () => {
      const a = randomChoice(ECHELLES.slice(0, 5));
      const b = randomChoice(ECHELLES.slice(5));
      const correct = `1/${fr(a.d)}`;
      return {
        text: `Deux cartes du même quartier : l'une au 1/${fr(a.d)}, l'autre au 1/${fr(b.d)}. Laquelle montre le plus de DÉTAILS ?`,
        format: "qcm",
        choices: shuffle([correct, `1/${fr(b.d)}`]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : le dénominateur dit de combien la réalité a été RÉDUITE.\n\n" +
          `Méthode : au 1/${fr(a.d)}, 1 cm vaut ${a.reel} ; au 1/${fr(b.d)}, 1 cm vaut ${b.reel}. La seconde tasse donc bien plus de terrain dans le même centimètre.\n\n` +
          `Calcul : ${fr(a.d)} < ${fr(b.d)}, donc la réduction est plus FAIBLE au 1/${fr(a.d)}.\n\n` +
          "Conclusion : ⚠️ c'est le contraire de l'intuition — le PLUS PETIT dénominateur donne la carte la plus détaillée.",
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : le sens même d'une échelle inférieure à 1. C'est
    // une convention de lecture, pas un calcul — donc figée.
    kind: "fixed",
    id: "4e_echelle_comprendre_fixed_reduction",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 1,
    theme: "neutral",
    text: "Une échelle 1/500 correspond à quoi ?",
    format: "qcm",
    choices: [
      "une réduction : le dessin est plus petit que la réalité",
      "un agrandissement : le dessin est plus grand que la réalité",
      "la taille réelle, sans changement",
      "une réduction de 500 centimètres",
    ],
    expected: ["une réduction : le dessin est plus petit que la réalité"],
    comparator: "mcq_exact",
    hint: "Le dessin fait 1 quand la réalité fait 500.",
    explanation:
      "Définition : dans une échelle 1/d, le premier nombre est le PLAN et le second la RÉALITÉ.\n\n" +
      "Méthode : on compare les deux. Ici 1 contre 500.\n\n" +
      "Calcul : le plan est 500 fois plus petit que la réalité.\n\n" +
      "Conclusion : une échelle plus petite que 1 est une RÉDUCTION. Une échelle plus grande que 1 — comme 20/1 pour dessiner une fourmi — serait un agrandissement.",
    tags: ["echelle", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     ECHELLE_DISTANCE_REELLE — du plan vers la réalité
  ========================================================================= */
  {
    kind: "template",
    id: "4e_echelle_distance_reelle_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie la mesure du plan par le dénominateur de l'échelle.",
    tags: ["echelle", "plan_vers_reel", "template", "canvas"],
    generate: () => {
      const e = randomChoice(ECHELLES.slice(0, 7));
      const cmPlan = randomChoice([2, 3, 4, 5, 6, 8, 12]);
      const reelCm = cmPlan * e.d;
      const reelM = reelCm / 100;
      return {
        text: `Sur ${e.contexte} à l'échelle 1/${fr(e.d)}, un chemin mesure ${cmPlan} cm. Quelle est sa longueur réelle, en mètres ?`,
        format: "short",
        expected: [String(reelM), fr(reelM)],
        comparator: "number_equal",
        explanation:
          "Définition : du plan vers la réalité, on AGRANDIT — donc on multiplie.\n\n" +
          `Méthode : on multiplie par le dénominateur, puis on convertit les centimètres en mètres.\n\n` +
          `Calcul : ${cmPlan} × ${fr(e.d)} = ${fr(reelCm)} cm, et ${fr(reelCm)} ÷ 100 = ${fr(reelM)} m.\n\n` +
          `Conclusion : le chemin mesure ${fr(reelM)} m. ⚠️ Oublier la conversion donnerait ${fr(reelCm)}, un nombre cent fois trop grand.`,
        canvas: canvasEchelle({
          variant: "distance_reelle",
          echelle: `1/${fr(e.d)}`,
          plan: `${cmPlan} cm`,
          reel: "?",
          question: "on multiplie par le dénominateur",
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_distance_reelle_tpl_2_km",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    hint: "Multiplie d'abord, convertis ensuite — et vise le kilomètre.",
    tags: ["echelle", "plan_vers_reel", "reunion", "qcm", "template"],
    generate: () => {
      const e = randomChoice(ECHELLES.slice(7));
      const cmPlan = randomChoice([2, 4, 5, 8, 10]);
      const reelCm = cmPlan * e.d;
      const reelKm = reelCm / 100000;
      const correct = `${fr(reelKm)} km`;
      return {
        text: `Sur une carte de La Réunion au 1/${fr(e.d)}, deux villages sont distants de ${cmPlan} cm. Quelle distance les sépare réellement ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${fr(reelKm * 10)} km`,
          `${fr(reelKm / 10)} km`,
          `${fr(reelCm / 100)} km`,
          `${fr(cmPlan * e.d)} m`,
          `${fr(reelKm)} m`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la distance réelle vaut la distance du plan multipliée par le dénominateur.\n\n" +
          "Méthode : on multiplie, puis on convertit — 1 km vaut 100 000 cm.\n\n" +
          `Calcul : ${cmPlan} × ${fr(e.d)} = ${fr(reelCm)} cm, soit ${fr(reelKm)} km.\n\n` +
          `Conclusion : ${correct}. ⚠️ Le piège n'est pas la multiplication, c'est la CONVERSION : une erreur d'un facteur 100 est la plus fréquente.`,
      };
    },
  },

  /* =========================================================================
     ECHELLE_DISTANCE_PLAN — de la réalité vers le plan
  ========================================================================= */
  {
    kind: "template",
    id: "4e_echelle_distance_plan_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "De la réalité vers le plan, on RÉDUIT — donc on divise.",
    tags: ["echelle", "reel_vers_plan", "template", "canvas"],
    generate: () => {
      const e = randomChoice(ECHELLES.slice(0, 6));
      const cmPlan = randomChoice([3, 4, 5, 6, 7, 9]);
      const reelCm = cmPlan * e.d;
      const reelM = reelCm / 100;
      return {
        text: `On dessine ${e.contexte} à l'échelle 1/${fr(e.d)}. Une façade mesure ${fr(reelM)} m en vrai. Quelle longueur fait-elle sur le plan, en cm ?`,
        format: "short",
        expected: [String(cmPlan)],
        comparator: "number_equal",
        explanation:
          "Définition : de la réalité vers le plan, on RÉDUIT — donc on divise.\n\n" +
          "Méthode : on convertit d'abord la mesure réelle en centimètres, puis on divise par le dénominateur.\n\n" +
          `Calcul : ${fr(reelM)} m = ${fr(reelCm)} cm, et ${fr(reelCm)} ÷ ${fr(e.d)} = ${cmPlan} cm.\n\n` +
          `Conclusion : ${cmPlan} cm sur le plan. ⚠️ Convertir AVANT de diviser : diviser des mètres par un dénominateur en centimètres n'a aucun sens.`,
        canvas: canvasEchelle({
          variant: "distance_plan",
          echelle: `1/${fr(e.d)}`,
          plan: "?",
          reel: `${fr(reelM)} m`,
          question: "on divise par le dénominateur",
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_distance_plan_tpl_2_choisir",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Le dessin doit tenir sur la feuille : cherche l'échelle qui va bien.",
    tags: ["echelle", "reel_vers_plan", "choisir", "qcm", "template"],
    generate: () => {
      const e = randomChoice(ECHELLES.slice(1, 6));
      const cmPlan = randomChoice([10, 12, 15, 20]);
      const reelM = (cmPlan * e.d) / 100;
      const correct = `1/${fr(e.d)}`;
      return {
        text: `Un terrain de ${fr(reelM)} m de long doit tenir sur ${cmPlan} cm de papier. Quelle échelle faut-il choisir ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `1/${fr(e.d * 10)}`,
          `1/${fr(e.d / 10)}`,
          `1/${fr(e.d * 2)}`,
          `1/${fr(cmPlan)}`,
          `1/${fr(reelM)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'échelle est le rapport entre la mesure du plan et la mesure réelle, dans la MÊME unité.\n\n" +
          "Méthode : on met tout en centimètres, puis on divise le réel par le plan.\n\n" +
          `Calcul : ${fr(reelM)} m = ${fr(reelM * 100)} cm. Et ${fr(reelM * 100)} ÷ ${cmPlan} = ${fr(e.d)}, donc l'échelle est 1/${fr(e.d)}.\n\n` +
          "Conclusion : choisir une échelle, c'est répondre à « par combien dois-je réduire ? ».",
      };
    },
  },

  /* =========================================================================
     AGRANDISSEMENT_RAPPORT — ⭐ le saut de la 4e commence ici
  ========================================================================= */
  {
    kind: "template",
    id: "4e_agrandissement_rapport_tpl_1_longueurs",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_rapport",
    difficulty: 3,
    theme: "neutral",
    hint: "Un agrandissement multiplie TOUTES les longueurs par le même nombre.",
    tags: ["agrandissement", "longueur", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const a = randomInt(3, 12);
      const b = randomInt(4, 15);
      return {
        text: `On agrandit un rectangle de ${a} cm sur ${b} cm avec un rapport ${k}. Quelle est sa nouvelle LARGEUR, en cm ?`,
        format: "short",
        expected: [String(a * k)],
        comparator: "number_equal",
        explanation:
          "Définition : un agrandissement de rapport k multiplie toutes les longueurs par k, et ne change aucun angle.\n\n" +
          "Méthode : on multiplie chaque dimension par le rapport.\n\n" +
          `Calcul : ${a} × ${k} = ${a * k} cm de large, et ${b} × ${k} = ${b * k} cm de long.\n\n` +
          `Conclusion : la nouvelle largeur est ${a * k} cm. La figure garde exactement la même FORME.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_rapport_tpl_2_trouver_k",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_rapport",
    difficulty: 4,
    theme: "neutral",
    hint: "Le rapport se lit en divisant une longueur de l'image par celle du modèle.",
    tags: ["agrandissement", "rapport", "qcm", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5, 6]);
      const a = randomInt(3, 10);
      const grand = a * k;
      const correct = String(k);
      return {
        text: `Deux maquettes du même bâtiment : la petite mesure ${a} cm de haut, la grande ${grand} cm. Quel est le rapport d'agrandissement de la petite vers la grande ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(grand - a),
          String(grand + a),
          String(a),
          String(grand),
          String(k + 1),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : le rapport d'agrandissement est le nombre par lequel on multiplie les longueurs.\n\n" +
          "Méthode : on DIVISE une longueur de l'image par la longueur correspondante du modèle.\n\n" +
          `Calcul : ${grand} ÷ ${a} = ${k}.\n\n` +
          `Conclusion : le rapport vaut ${k}. ⚠️ ${grand} − ${a} = ${grand - a} serait l'ÉCART, pas le rapport — et l'écart ne se conserve pas d'une dimension à l'autre.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_rapport_tpl_3_reduction",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_rapport",
    difficulty: 4,
    theme: "neutral",
    hint: "Une réduction, c'est un rapport plus petit que 1.",
    tags: ["agrandissement", "reduction", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const grand = randomInt(3, 9) * k;
      return {
        text: `On réduit une figure avec un rapport 1/${k}. Un côté mesurait ${grand} cm. Combien mesure-t-il après réduction, en cm ?`,
        format: "short",
        expected: [String(grand / k)],
        comparator: "number_equal",
        explanation:
          `Définition : réduire d'un rapport 1/${k}, c'est multiplier les longueurs par 1/${k} — donc les diviser par ${k}.\n\n` +
          "Méthode : agrandissement et réduction sont la même opération, avec un rapport plus grand ou plus petit que 1.\n\n" +
          `Calcul : ${grand} ÷ ${k} = ${grand / k} cm.\n\n` +
          `Conclusion : ⭐ une échelle 1/${k} EST une réduction de rapport 1/${k} — c'est le même objet que sur une carte.`,
      };
    },
  },

  /* =========================================================================
     AGRANDISSEMENT_AIRE — ⭐⭐ le point qui coûte le plus cher de la notion
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE, ET ELLE SE MONTRE. k = 2 est le cas emblématique :
    // l'élève est certain que l'aire double. Le dessin le contredit sans une
    // phrase — un carré de côté 2 tient QUATRE fois dans un carré de côté 4, et
    // les carreaux se comptent.
    kind: "fixed",
    id: "4e_agrandissement_aire_fixed_double",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_aire",
    difficulty: 2,
    theme: "neutral",
    text: "On double toutes les longueurs d'un carré. Par combien son AIRE est-elle multipliée ?",
    format: "qcm",
    choices: ["2", "4", "8", "16"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Compte les carreaux : combien de petits carrés dans le grand ?",
    explanation:
      "Définition : l'aire d'un carré vaut côté × côté. Si le côté est multiplié par 2, l'aire l'est DEUX FOIS.\n\n" +
      "Méthode : on compte. Un carré de côté 2 tient quatre fois dans un carré de côté 4.\n\n" +
      "Calcul : (2 × côté) × (2 × côté) = 4 × côté². L'aire est multipliée par 2² = 4.\n\n" +
      "Conclusion : ⚠️ doubler les longueurs ne double PAS l'aire, il la quadruple. C'est l'erreur la plus fréquente du chapitre.",
    canvas: carreDouble,
    tags: ["agrandissement", "aire", "valeur_particuliere", "qcm", "canvas"],
  },
  {
    kind: "template",
    id: "4e_agrandissement_aire_tpl_1_calculer",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_aire",
    difficulty: 4,
    theme: "neutral",
    hint: "Les longueurs sont multipliées par k, l'aire par k².",
    tags: ["agrandissement", "aire", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5]);
      const aire = randomChoice([12, 15, 18, 20, 24, 30, 36]);
      return {
        text: `Une figure a une aire de ${aire} cm². On l'agrandit avec un rapport ${k}. Quelle est l'aire de la nouvelle figure, en cm² ?`,
        format: "short",
        expected: [String(aire * k * k)],
        comparator: "number_equal",
        explanation:
          "Définition : une aire est un produit de DEUX longueurs. Chacune étant multipliée par k, l'aire l'est par k × k.\n\n" +
          `Méthode : on multiplie l'aire par k², et non par k.\n\n` +
          `Calcul : k² = ${k}² = ${k * k}, donc ${aire} × ${k * k} = ${aire * k * k} cm².\n\n` +
          `Conclusion : ⚠️ ${aire} × ${k} = ${aire * k} est l'erreur à éviter — ce serait vrai pour une LONGUEUR, pas pour une aire.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_aire_tpl_2_retrouver_k",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_aire",
    difficulty: 5,
    theme: "neutral",
    hint: "Si l'aire est multipliée par 9, par combien les longueurs le sont-elles ?",
    tags: ["agrandissement", "aire", "inverse", "qcm", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4, 5, 6]);
      const correct = String(k);
      return {
        text: `L'aire d'une figure a été multipliée par ${k * k} lors d'un agrandissement. Par combien ses LONGUEURS ont-elles été multipliées ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(k * k),
          String(k * k * k),
          String(k * 2),
          String(k + 1),
          String(k * k - k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'aire est multipliée par k² quand les longueurs le sont par k.\n\n" +
          "Méthode : on remonte donc par la racine carrée.\n\n" +
          `Calcul : k² = ${k * k}, or ${k} × ${k} = ${k * k}, donc k = ${k}.\n\n` +
          `Conclusion : les longueurs ont été multipliées par ${k}. ⚠️ Répondre ${k * k} revient à confondre le rapport des longueurs et celui des aires.`,
      };
    },
  },

  /* =========================================================================
     AGRANDISSEMENT_VOLUME — la même idée, une dimension plus haut
  ========================================================================= */
  {
    kind: "template",
    id: "4e_agrandissement_volume_tpl_1",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_volume",
    difficulty: 5,
    theme: "neutral",
    hint: "Un volume est un produit de TROIS longueurs.",
    tags: ["agrandissement", "volume", "template", "canvas"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const volume = randomChoice([5, 8, 10, 12, 20, 25]);
      return {
        text: `Un solide a un volume de ${volume} cm³. On l'agrandit avec un rapport ${k}. Quel est son nouveau volume, en cm³ ?`,
        format: "short",
        expected: [String(volume * k * k * k)],
        comparator: "number_equal",
        explanation:
          "Définition : un volume est un produit de TROIS longueurs. Chacune multipliée par k, le volume l'est par k × k × k.\n\n" +
          `Méthode : on multiplie le volume par k³.\n\n` +
          `Calcul : k³ = ${k}³ = ${k * k * k}, donc ${volume} × ${k * k * k} = ${volume * k * k * k} cm³.\n\n` +
          `Conclusion : ⭐ la règle monte d'une dimension à chaque fois — longueurs × ${k}, aires × ${k * k}, volumes × ${k * k * k}.`,
        canvas: tableau(
          ["ce qu'on mesure", `avec un rapport ${k}`],
          [
            { values: ["une longueur", `× ${k}`] },
            { values: ["une aire", `× ${k * k}`] },
            { values: ["un volume", `× ${k * k * k}`] },
          ],
          "une dimension de plus, un facteur k de plus",
          { row: 2 }
        ),
      };
    },
  },
  {
    kind: "template",
    id: "4e_agrandissement_volume_tpl_2_maquette",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "agrandissement_volume",
    difficulty: 5,
    theme: "neutral",
    hint: "L'échelle porte sur les longueurs, pas sur le volume.",
    tags: ["agrandissement", "volume", "maquette", "qcm", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 5, 10]);
      const vMaquette = randomChoice([2, 3, 4, 6]);
      const correct = `${fr(vMaquette * k * k * k)} L`;
      return {
        text: `Une maquette de réservoir contient ${vMaquette} L. Le vrai réservoir est ${k} fois plus grand EN LONGUEUR. Combien contient-il ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${fr(vMaquette * k)} L`,
          `${fr(vMaquette * k * k)} L`,
          `${fr(vMaquette + k)} L`,
          `${fr(vMaquette * k * 3)} L`,
          `${fr(vMaquette * k * k * k * k)} L`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : « k fois plus grand en longueur » multiplie les trois dimensions par k.\n\n" +
          "Méthode : le volume est donc multiplié par k³.\n\n" +
          `Calcul : ${k}³ = ${k * k * k}, donc ${vMaquette} × ${k * k * k} = ${fr(vMaquette * k * k * k)} L.\n\n` +
          `Conclusion : ⚠️ répondre ${fr(vMaquette * k)} L revient à traiter le volume comme une longueur. C'est pour ça qu'une maquette au 1/10 ne contient pas un dixième, mais un MILLIÈME.`,
      };
    },
  },

  /* =========================================================================
     ECHELLE_DEFI — des situations, et le contrôle de vraisemblance
  ========================================================================= */
  {
    kind: "template",
    id: "4e_echelle_defi_tpl_1_carte_reunion",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Convertis tout en centimètres avant de diviser.",
    tags: ["echelle", "defi", "reunion", "template"],
    generate: () => {
      const km = randomChoice([12, 15, 20, 24, 30]);
      const cm = randomChoice([4, 5, 6, 8]);
      const d = (km * 100000) / cm;
      return {
        text: `Deux villes de La Réunion sont distantes de ${km} km. Sur une carte, elles sont à ${cm} cm l'une de l'autre. Quelle est l'échelle de la carte ? Donne le dénominateur.`,
        format: "short",
        expected: [String(d), fr(d)],
        comparator: "number_equal",
        explanation:
          "Définition : l'échelle est le rapport plan / réalité, dans la MÊME unité.\n\n" +
          "Méthode : on convertit la distance réelle en centimètres, puis on divise par la mesure du plan.\n\n" +
          `Calcul : ${km} km = ${fr(km * 100000)} cm. Et ${fr(km * 100000)} ÷ ${cm} = ${fr(d)}.\n\n` +
          `Conclusion : l'échelle est 1/${fr(d)}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_defi_tpl_2_vraisemblance",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde si le résultat est plausible avant de le valider.",
    tags: ["echelle", "defi", "piege", "qcm", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 4]);
      const aire = randomChoice([20, 24, 30, 40]);
      const faux = aire * k;
      const vrai = aire * k * k;
      const correct = `non : l'aire vaut ${fr(vrai)} cm²`;
      return {
        text: `Un élève agrandit une figure de ${aire} cm² avec un rapport ${k}, et annonce ${fr(faux)} cm². A-t-il raison ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `oui : ${fr(faux)} cm² est correct`,
          `non : l'aire vaut ${fr(aire * k * k * k)} cm²`,
          `non : l'aire vaut ${fr(aire + k)} cm²`,
          `non : l'aire vaut ${fr(aire * 2 * k)} cm²`,
          `non : l'aire ne change pas`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les longueurs sont multipliées par k, l'aire par k².\n\n" +
          `Méthode : il a multiplié par ${k} au lieu de ${k}².\n\n` +
          `Calcul : ${aire} × ${k * k} = ${fr(vrai)} cm².\n\n` +
          `Conclusion : ⭐ le contrôle de vraisemblance suffit à repérer l'erreur — une figure ${k} fois plus longue ET ${k} fois plus large occupe visiblement bien plus que ${k} fois la place.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_echelle_defi_tpl_3_peinture",
    niveau: "4e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La peinture se compte à l'aire, pas à la longueur.",
    tags: ["echelle", "defi", "aire", "probleme", "template"],
    generate: () => {
      const k = randomChoice([2, 3]);
      const pots = randomChoice([3, 4, 5, 6]);
      return {
        text: `Il faut ${pots} pots de peinture pour repeindre un panneau. Combien en faut-il pour un panneau ${k} fois plus grand en longueur ET en largeur ?`,
        format: "short",
        expected: [String(pots * k * k)],
        comparator: "number_equal",
        explanation:
          "Définition : la quantité de peinture est proportionnelle à l'AIRE, pas aux longueurs.\n\n" +
          `Méthode : les deux dimensions sont multipliées par ${k}, donc l'aire par ${k}² = ${k * k}.\n\n` +
          `Calcul : ${pots} × ${k * k} = ${pots * k * k} pots.\n\n` +
          `Conclusion : ⚠️ ${pots} × ${k} = ${pots * k} pots ne suffirait pas — c'est ce genre d'erreur qui coûte un aller-retour au magasin.`,
      };
    },
  },
];
